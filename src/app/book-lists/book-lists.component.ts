import Swal from "sweetalert2";
import { Subscription } from 'rxjs';
import { BookSearchService } from '../book-search.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BorrowingHistoryServiceService, BorrowingTransaction } from '../borrowing-history/borrowing-history-service.service';

interface Book {
  bookId: number;
  bookName: string;
  author: string;
  genre: string;
  isbn: string;
  yearPublished: number;
  availableCopies: number;
}

@Component({
  selector: 'app-book-lists',
  standalone: true,
  templateUrl: './book-lists.component.html',
  styleUrls: ['./book-lists.component.css'],
  imports: [CommonModule, FormsModule]
})
export class BookListsComponent implements OnInit, OnDestroy {
  books: Book[] = [];
  filteredBooks: Book[] = [];
  borrowedBookIds: number[] = [];
  role: string | null = null;
  memberId: string | null = null;

  // Store statuses separately, indexed by bookId
  bookStatuses: { [bookId: number]: string } = {};

  bookCoverImages: { [key: number]: string } = {
    1: 'Java_Book.jpg',
    4: 'HarryPotter-1.jpg',
    5: 'HarryPotter-2.jpg',
    6: 'HarryPotter-3.jpg',
    7: 'HarryPotter-4.jpg',
    9: '',
  };
  private searchSubscription!: Subscription;

  showUpdateDialog = false;
  updateBookModel: Partial<Book> = {};
  updatingBookId: number | null = null;

  showAddDialog = false;
  addBookModel: Partial<Book> = {};

  constructor(
    private http: HttpClient,
    private router: Router,
    private bookSearchService: BookSearchService,
    private borrowingHistoryService: BorrowingHistoryServiceService
  ) {}

  ngOnInit(): void {
    this.role = localStorage.getItem('role');
    this.memberId = localStorage.getItem('memberId');

    this.fetchBooks();
    // Load borrowing statuses if member is logged in
    if (this.role === 'MEMBER' && this.memberId) {
      this.borrowingHistoryService
        .getTransactionsByMemberId(+this.memberId)
        .subscribe((transactions) => {
          this.setBookStatuses(transactions);
        });
    }

    this.searchSubscription = this.bookSearchService.searchTerm$.subscribe(term => {
      this.filterBooks(term);
    });
  }

  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  }

  fetchBooks() {
    this.http.get<Book[]>('http://localhost:4321/books/get-books').subscribe(data => {
      this.books = data;
      this.filteredBooks = data;
    });
  }

  fetchBorrowedBooks(memberId: number) {
    this.http.get<any[]>(`http://localhost:4321/books/get-borrowed-books/${memberId}`)
      .subscribe({
        next: (data) => {
          this.borrowedBookIds = data.map(book => book.bookId);
        },
        error: (err) => {
          console.error('Error fetching borrowed books:', err);
        }
      });
  }

  filterBooks(term: string) {
    const lowerTerm = term.toLowerCase();
    this.filteredBooks = this.books.filter(book =>
      book.bookName.toLowerCase().includes(lowerTerm) ||
      book.author.toLowerCase().includes(lowerTerm) ||
      book.genre.toLowerCase().includes(lowerTerm)
    );
  }

  getBookCover(bookId: number): string {
    return this.bookCoverImages[bookId] || 'default-book.jpg';
  }

  setBookStatuses(transactions: BorrowingTransaction[]) {
    this.bookStatuses = {};
    for (const tx of transactions) {
      if (tx.book?.bookId) {
        this.bookStatuses[tx.book.bookId] = tx.status;
      }
    }
  }

  borrowBook(bookId: number) {
    if (!this.memberId) {
      Swal.fire('Error', 'You must be logged in to borrow a book.', 'error');
      this.router.navigate(['/login']);
      return;
    }

    this.http.post(
      `http://localhost:4321/books/borrow/${this.memberId}/${bookId}`,
      {},
      { observe: 'response', responseType: 'text' }
    ).subscribe({
      next: (res) => {
        Swal.fire('Success', 'Book borrow pending for approval', 'success');
        this.fetchBooks();
        // Refresh statuses after borrowing
        this.borrowingHistoryService
          .getTransactionsByMemberId(+this.memberId!)
          .subscribe(transactions => {
            this.setBookStatuses(transactions);
          });
      },
      error: (err) => {
        console.error(err);
        if (typeof err.error === 'string') {
          Swal.fire('Error', err.error, 'error');
        } else {
          Swal.fire('Error', 'Error borrowing because the book is in use.', 'error');
        }
      }
    });
  }

  openUpdateDialog(bookId: number) {
    this.updatingBookId = bookId;

    this.http.get<Book>(`http://localhost:4321/books/get-book-by-id/${bookId}`).subscribe(book => {
      this.updateBookModel = {
        bookName: book.bookName,
        author: book.author,
        genre: book.genre,
        isbn: book.isbn,
        yearPublished: book.yearPublished,
        availableCopies: book.availableCopies
      };
      this.showUpdateDialog = true;
    });
  }

  closeUpdateDialog() {
    this.showUpdateDialog = false;
    this.updateBookModel = {};
    this.updatingBookId = null;
  }

  updateBook() {
    if (!this.updatingBookId) return;

    const updatedBook = {
      bookName: this.updateBookModel.bookName,
      author: this.updateBookModel.author,
      genre: this.updateBookModel.genre,
      isbn: this.updateBookModel.isbn,
      yearPublished: this.updateBookModel.yearPublished,
      availableCopies: this.updateBookModel.availableCopies
    };

    this.http.put(
      `http://localhost:4321/books/admin/update-book/${this.updatingBookId}`,
      updatedBook,
      { responseType: 'text' }
    ).subscribe({
      next: (res) => {
        Swal.fire('Success', res || 'Book updated successfully!', 'success');
        this.closeUpdateDialog();
        this.fetchBooks();
      },
      error: (err) => {
        console.error(err);
        Swal.fire('Error', 'Error updating book.', 'error');
      }
    });
  }

  confirmDelete(bookId: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this book!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteBook(bookId);
      }
    });
  }

  deleteBook(bookId: number) {
    this.http.delete(
      `http://localhost:4321/books/admin/delete-by-id/${bookId}`,
      { responseType: 'text' }
    ).subscribe({
      next: (res) => {
        Swal.fire('Deleted!', res || 'Book deleted successfully!', 'success');
        this.fetchBooks();
      },
      error: (err) => {
        console.error(err);
        Swal.fire('Error', 'Error deleting book.', 'error');
      }
    });
  }

  openAddDialog() {
    this.addBookModel = {};  // reset form model
    this.showAddDialog = true;
  }

  closeAddDialog() {
    this.showAddDialog = false;
    this.addBookModel = {};
  }

  addBook() {
    this.http.post(
      'http://localhost:4321/books/admin/add',
      this.addBookModel,
      { responseType: 'text' }
    ).subscribe({
      next: (res) => {
        Swal.fire('Success', res || 'Book added successfully!', 'success');
        this.closeAddDialog();
        this.fetchBooks(); // refresh book list
      },
      error: (err) => {
        console.error(err);
        Swal.fire('Error', 'Error adding book.', 'error');
      }
    });
  }

  returnBook(bookId: number) {
    if (!this.memberId) {
      Swal.fire('Error', 'You must be logged in to return a book.', 'error');
      this.router.navigate(['/login']);
      return;
    }

    this.http.post(
      `http://localhost:4321/books/return/${this.memberId}/${bookId}`,
      {},
      { responseType: 'text' }
    ).subscribe({
      next: (res) => {
        Swal.fire('Success', 'Book return initiated!', 'success');
        this.fetchBooks();

        this.borrowingHistoryService
          .getTransactionsByMemberId(+this.memberId!)
          .subscribe(transactions => {
            this.setBookStatuses(transactions);
          });
      },
      error: (err) => {
        console.error(err);
        Swal.fire('Error', 'Error returning book.', 'error');
      }
    });
  }
}


import { Subscription } from 'rxjs';
import { BookSearchService } from '../book-search.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-lists',
  standalone: true,
  templateUrl: './book-lists.component.html',
  styleUrls: ['./book-lists.component.css'],
  imports: [CommonModule, FormsModule]
})

export class BookListsComponent implements OnInit {
  books: any[] = [];
  filteredBooks: any[] = [];
  borrowedBookIds: number[] = [];
  private searchSubscription!: Subscription;

  constructor(
    private http: HttpClient,
    private router: Router,
    private bookSearchService: BookSearchService
  ) {}

  ngOnInit(): void {
    this.fetchBooks();

    const memberId = localStorage.getItem('memberId');
    if (memberId) {
      this.fetchBorrowedBooks(+memberId);
    }

    this.searchSubscription = this.bookSearchService.searchTerm$.subscribe(term => {
      this.filterBooks(term);
    });
  }


  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  }

  fetchBooks() {
    this.http.get('http://localhost:4321/books/get-books').subscribe(data => {
      this.books = data as any[];
      this.filteredBooks = this.books;
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

  borrowBook(bookId: number) {
    const memberId = localStorage.getItem('memberId');
    if (!memberId) {
      alert('You must be logged in to borrow a book.');
      this.router.navigate(['/login']);
      return;
    }

    this.http.post(
      `http://localhost:4321/books/borrow/${memberId}/${bookId}`,
      {},
      { observe: 'response', responseType: 'text' }
    ).subscribe({
      next: (res) => {
        alert(res.body || 'Book borrowed successfully!');
        this.fetchBooks();
        this.fetchBorrowedBooks(+memberId);
      },
      error: (err) => {
        console.error(err);
        if (typeof err.error === 'string') {
          alert(err.error);
        } else {
          alert('Error borrowing book.');
        }
      }
    });
  }


  returnBook(bookId: number) {
    const memberId = localStorage.getItem('memberId');
    if (!memberId) {
      alert('You must be logged in to return a book.');
      this.router.navigate(['/login']);
      return;
    }

    this.http.post(
      `http://localhost:4321/books/return/${memberId}/${bookId}`,
      {},
      { observe: 'response', responseType: 'text' }
    ).subscribe({
      next: (res) => {
        alert(res.body || 'Book returned successfully!');
        this.fetchBooks();
        this.fetchBorrowedBooks(+memberId);
      },
      error: (err) => {
        console.error(err);
        alert('Error returning book.');
      }
    });
  }

}

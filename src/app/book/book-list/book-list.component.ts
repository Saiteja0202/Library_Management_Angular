import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { BookService } from '../book.service';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { BookDetailsDialogComponent } from '../book-details-dialog/book-details-dialog.component';

@Component({
  selector: 'app-book-list',
  imports: [CommonModule],
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: any[] = [];

  constructor(private bookService: BookService, private router: Router, private dialog: MatDialog) {}

  ngOnInit() {
    this.bookService.getAllBooks().subscribe({
      next: (data) => {
        this.books = data.map((book: any) => ({
          ...book,
          bookImage: this.getBookImage(book.bookName),
        }));
      },
      error: (err) => {
        console.error('Failed to load books:', err);
      }
    });
  }

  getBookImage(bookName: string): string {
    const imageMap: { [key: string]: string } = {
      'Java': '/Java_Book.jpg',
      'Python': '/Python_Book.jpg',
      'Java Script': '/JavaScript_Book.jpg',
      'JDBC': '/JDBC_Book.jpg',
      'C++': 'C++_Book.jpg',
      'C#':'C#_Book2.png',
      'Spring':'Spring_Book.jpg'

    };

    return imageMap[bookName] || 'default-book.jpg';
  }

  viewDetails(book: any) {
    this.dialog.open(BookDetailsDialogComponent, {
      width: '500px',
      data: book // Pass full book object
    });
  }
}

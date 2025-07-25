// library.component.ts
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'member',
  standalone:true,
  imports:[RouterOutlet,FormsModule,CommonModule,RouterLink,RouterLinkActive],
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent {
  dropdownVisible = false;
  searchVisible = true; 

  books: any[] = [];
  searchTerm: string = '';
  filteredBooks: any[] = []; 
  

  constructor(private http: HttpClient,private router: Router) {
    this.fetchBooks();
  }

  ngOnInit(): void {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      const currentRoute = this.router.url;
      this.searchVisible = currentRoute.includes('member') && !currentRoute.includes('notifications') && !currentRoute.includes('fines') && !currentRoute.includes('history');
    });
  }

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }

  logout() {
    
  }

  fetchBooks() {
    this.http.get('http://localhost:4321/books/get-books').subscribe(data => {
      
      this.books = data as any[];
    this.filteredBooks = this.books;
    });
  }

  filterBooks() {
    const term = this.searchTerm.toLowerCase();
    console.log(term);
    
    this.filteredBooks = this.books.filter(book =>
      book.bookName.toLowerCase().includes(term) ||
      book.author.toLowerCase().includes(term) ||
      book.genre.toLowerCase().includes(term)
    );
  }

  onSearch() {
    this.http.get(`http://localhost:4321/books/search?term=${this.searchTerm}`)
      .subscribe(data => {
        this.books = data as any[];
      });
  }

  borrowBook(bookId: number) {
    this.http.post(`http://localhost:4321/books/borrow/${bookId}`, {})
      .subscribe(() => alert('Book borrowed successfully!'));
  }
}

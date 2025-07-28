import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { BookSearchService } from '../../book-search.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-admin',
  imports:[RouterOutlet,FormsModule,CommonModule,RouterLink,RouterLinkActive],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  dropdownVisible = false;
  searchVisible = true; 
  showBookList: boolean = true;

  books: any[] = [];
  searchTerm: string = '';
  filteredBooks: any[] = []; 
  

  constructor(private http: HttpClient,private router: Router,private bookSearchService: BookSearchService) {
    this.fetchBooks();
  }

  ngOnInit(): void {
    const currentRoute = this.router.url;
    this.searchVisible = currentRoute === '/admin/book-lists';
  
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const updatedRoute = this.router.url;
        this.searchVisible = updatedRoute === '/admin/book-lists';
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
    this.bookSearchService.setSearchTerm(this.searchTerm);
  }
  
  

}

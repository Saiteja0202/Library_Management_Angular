// library.component.ts
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { BookSearchService } from '../book-search.service';


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
  showBookList: boolean = true;

  books: any[] = [];
  searchTerm: string = '';
  filteredBooks: any[] = []; 
  role: string | null = null;
  memberId: number | null = null;

  constructor(private http: HttpClient,private router: Router,private bookSearchService: BookSearchService) {
    this.fetchBooks();
  }

  ngOnInit(): void {
  
    this.role = localStorage.getItem('role');
    this.memberId = Number(localStorage.getItem('memberId'));
    const currentRoute = this.router.url;
    this.searchVisible = currentRoute === '/member/book-lists';
  
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const updatedRoute = this.router.url;
        this.searchVisible = updatedRoute === '/member/book-lists';
      });
  }
  

  
  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }

  logout(): void {
    localStorage.removeItem('memberId');
    localStorage.removeItem('authToken');
  
    this.router.navigate(['/login']);
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

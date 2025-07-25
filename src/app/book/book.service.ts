import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from './book.model';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private baseUrl = 'http://localhost:4321/books';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseUrl}/get-books`);
  }

  getBookById(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.baseUrl}/get-book-by-id/${id}`);
  }

  addBook(book: Book): Observable<string> {
    return this.http.post(`${this.baseUrl}/add`, book, {
      headers: this.getAuthHeaders(),
      responseType: 'text',
    });
  }

  updateBook(id: number, book: Book): Observable<string> {
    return this.http.put(`${this.baseUrl}/update-book/${id}`, book, {
      headers: this.getAuthHeaders(),
      responseType: 'text',
    });
  }

  deleteBook(id: number): Observable<string> {
    return this.http.delete(`${this.baseUrl}/delete-by-id/${id}`, {
      headers: this.getAuthHeaders(),
      responseType: 'text',
    });
  }

  searchByTitle(title: string): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseUrl}/search-title/${title}`);
  }

  searchByGenre(genre: string): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseUrl}/search-genre/${genre}`);
  }

  searchByAuthor(author: string): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseUrl}/search-author/${author}`);
  }
}

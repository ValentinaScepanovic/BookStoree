
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/books.model';
import { Genre } from '../models/genres.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private apiUrl = '/api/book/';

  constructor(private http: HttpClient) { }

  getGenres(): Observable<Genre[]> {
    const url = `${this.apiUrl}allGenres`;
    return this.http.get<Genre[]>(url)
  }
  getGenreById(genreId: number) : Observable<Genre>{
    const url = `${this.apiUrl}getGenre/${genreId}`;
    return this.http.get<Genre>(url);
  }

  getAllBooks(): Observable<Book[]> {
    const url = `${this.apiUrl}allBooks`;
    return this.http.get<Book[]>(url)
  }

  getBooksByPublishingDate(): Observable<Book[]> {
    const url = `${this.apiUrl}getBooksByPublishingDate`;
    return this.http.get<Book[]>(url)
  }

  getBestSellerBooks(): Observable<Book[]> {
    const url = `${this.apiUrl}getBestSellerBooks`;
    return this.http.get<Book[]>(url)
  }

  addNewBook(book: Book): Observable<Book> {
    const url = `${this.apiUrl}addNewBook`;
    return this.http.post<Book>(url, book);
  }

  editBook(bookId: number, book: Book): Observable<number> {
    const url = `${this.apiUrl}editBook/${bookId}`;
    return this.http.put<number>(url, book);
  }

  getBookById(bookId: number) : Observable<Book>{
    const url = `${this.apiUrl}getBook/${bookId}`;
    return this.http.get<Book>(url);
  }

  deleteBook(bookId: number): Observable<number> {
    const url = `${this.apiUrl}deleteBook/${bookId}`;
    return this.http.delete<number>(url);
  }

}
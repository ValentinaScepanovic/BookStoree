import { BookService } from './../../services/books.service';
import { Component, OnInit } from "@angular/core";
import { Book } from "src/app/models/books.model";
import { Location } from '@angular/common';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    searchBook: string = '';
    filteredBooks: Book[] = [];
    books: Book[] = [];

    constructor(private _bookService: BookService, private location: Location) {}

  ngOnInit(): void {
    this._bookService.getAllBooks().subscribe(
      (response) => {
        this.books = response;
      },
      (error) => {
        console.log('Error fetching books:', error);
      }
    );
  }
    filterBooks(): void {
       this.filteredBooks = this.books.filter(item =>
          item.bookName.toLowerCase().includes(this.searchBook.toLowerCase()) ||
          item.author.toLowerCase().includes(this.searchBook.toLowerCase())
        );
      }
      onSearchInput(): void {
        this.filterBooks();
      }
      
      refreshPage(bookId: number): void {
        const currentUrl = this.location.path(); 
        const bookUrl = `/book/${bookId}`; 
        this.location.replaceState(bookUrl);
        this.location.go(bookUrl); 
        window.location.reload();
      }
      
}
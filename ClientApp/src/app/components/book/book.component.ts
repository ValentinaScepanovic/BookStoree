import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/models/books.model';
import { BookService } from "src/app/services/books.service";
import { WishListService } from "src/app/services/wishList.service";
import { BuyListService } from "src/app/services/buyList.service";
import { Genre } from "src/app/models/genres.model";

@Component({
    selector: 'app-book',
    templateUrl: './book.component.html',
    styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

    loading: boolean = true;
    genres:Genre[]=[];
    book: Book ={
        bookId:null,
        bookName:'',
        author:'',
        genreId:0,
        description : '',
        isBestseller: null,
        picture:'',
        price:0,
        genre: null
      };

    constructor(
      private _bookService: BookService,
      private _wishListService: WishListService,
      private _buyListService: BuyListService,
      private _route: ActivatedRoute) { }

    ngOnInit(): void {
        const bookId = Number(this._route.snapshot.paramMap.get('bookId'));
        this.getBook(bookId)
    }
    getBook(bookId: number): void {
      this._bookService.getBookById(bookId).subscribe(
        (response) => {
          this.book = response;
          this._bookService.getGenreById(this.book.genreId).subscribe(
            (genreResponse) => {
              this.book.genre = genreResponse;
              this.loading = false;
            },
            (genreError) => {
              console.log('Error fetching genre:', genreError);
              this.loading = false;
            }
          );
        },
        (error) => {
          console.log('Error fetching book:', error);
          this.loading = false;
        }
      );
    }
   
      addToWish() {
        this._wishListService.addToWishList(this.book);
        alert('Book added to the Wish List!');
      }
      addToBuy() {
        this._buyListService.addToBuyList(this.book);
        alert('Book added to the Buy List!');
      }


}
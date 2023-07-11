import { Component, OnInit } from "@angular/core";
import { Book } from "src/app/models/books.model";
import { BookService } from "src/app/services/books.service";
import { BuyListService } from "src/app/services/buyList.service";
import { WishListService } from "src/app/services/wishList.service";

@Component({
    selector: 'app-wishList',
    templateUrl: './wishList.component.html',
    styleUrls: ['./wishList.component.css']
})

export class WishListComponent implements OnInit {

    loading: boolean = true;
    form=false;
    wishList: Book[];
    removeBook;

  constructor(private _wishListService: WishListService,
    private _buyListService: BuyListService,
    private _bookService: BookService ) {
    this.wishList = this._wishListService.wishList;
  }

    ngOnInit(): void {
        this.loading=false;
    }

    openForm(bookId: number){
        this.form=!this.form;
        this._bookService.getBookById(bookId).subscribe((book) => {
            this.removeBook=book
          });
      }
      closeForm(){
        this.form=!this.form;
      }

    removeFromWishList(): void {
        this._wishListService.removeFromWishList(this.removeBook);
        this.form=!this.form;
      }

    remove(book: Book): void {
        this._wishListService.removeFromWishList(book);
      }

      addToBuy(book: Book) {
        this._buyListService.addToBuyList(book);
        this.remove(book);
        alert('Book added to the Buy List!');
      }

}
import { Component, OnInit } from "@angular/core";
import { Book } from "src/app/models/books.model";
import { BookService } from "src/app/services/books.service";
import { BuyListService } from "src/app/services/buyList.service";

@Component({
    selector: 'app-buyList',
    templateUrl: './buyList.component.html',
    styleUrls: ['./buyList.component.css']
})

export class BuyListComponent implements OnInit {

    loading: boolean = true;
    formRemove=false;
    formBuy=false;
    buyList: Book[];
    removeBook;
    totalPrice: number = 0;

  constructor(private _buyListService: BuyListService,private _bookService: BookService) {
    this.buyList = this._buyListService.buyList;
  }

    ngOnInit(): void {
        this.loading=false;
        this.calculateTotalPrice();

      this._buyListService.bookAdded.subscribe(() => {
      this.calculateTotalPrice();
      })
  }

    buyForm(){
      this.formBuy=!this.formBuy;
    }

    openRemoveForm(bookId: number){
      this.formRemove=!this.formRemove;
      this._bookService.getBookById(bookId).subscribe((book) => {
          this.removeBook=book
        });
    }
    closeRemoveForm(){
      this.formRemove=!this.formRemove;
    }

  removeFromBuyList(): void {
      this._buyListService.removeFromBuyList(this.removeBook);
      this.formRemove=!this.formRemove;
      this.calculateTotalPrice();
    }

    calculateTotalPrice(): void {
      this.totalPrice = this.buyList.reduce((total, book) => total + book.price, 0);
    }

    buy(){
      alert('Books were bought !');
      this._buyListService.clearBuyList();
      this.buyList=[];
      this.formBuy=!this.formBuy;
      this.calculateTotalPrice();
    }

  
}

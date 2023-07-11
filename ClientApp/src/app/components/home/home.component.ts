import { Component, OnInit } from "@angular/core";
import { Book } from 'src/app/models/books.model';
import { BookService } from "src/app/services/books.service";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    loading: boolean = true;

    images = [
      { img: 'assets/pictures/slider1.jpg'},
      { img: 'assets/pictures/slider2.jpg'},
      { img: 'assets/pictures/slider3.jpg'},
      { img: 'assets/pictures/slider4.jpg'}
    ];

    slideConfig = {  
      "slidesToShow": 1,  
      "slidesToScroll": 1,  
      "dots": true,  
      "infinite": true,
      "autoplay": true,
      "autoplaySpeed": 3000
    };  

    books: Book[] = [];
    bestsellerBooks:Book[]=[];

    constructor(private _bookService: BookService) {}

      ngOnInit(): void {
        this.loading=true;
        this.getBestsellerBooks();
        this._bookService.getBooksByPublishingDate().subscribe(
          (response) => {
            this.books = response.slice(0,6);
            this.loading = false;
          },
          (error) => {
            console.log('Error fetching books:', error);
            this.loading = false;
          }
        );
      }
      getBestsellerBooks(): void {
        this._bookService.getBestSellerBooks().subscribe(
          (response) => {
            this.bestsellerBooks = response.slice(0,6);
            this.loading = false;
          },
          (error) => {
            console.log('Error fetching bestseller books:', error);
            this.loading = false;
          }
        );
      }
}
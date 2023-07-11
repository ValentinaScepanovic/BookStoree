import { Component, OnInit } from "@angular/core";
import { Book } from 'src/app/models/books.model';
import { BookService } from "src/app/services/books.service";

@Component({
    selector: 'app-bestsellers',
    templateUrl: './bestsellers.component.html',
    styleUrls: ['./bestsellers.component.css']
})
export class BestSellersComponent implements OnInit {

    loading: boolean = true;
    bestsellerBooks:Book[]=[];

    constructor(private _bookService: BookService) {}

      ngOnInit(): void {
        this.loading=true;
        this._bookService.getBestSellerBooks().subscribe(
          (response) => {
            this.bestsellerBooks = response;
            this.getGenreDetails();
            this.loading = false;
          },
          (error) => {
            console.log('Error fetching bestseller books:', error);
            this.loading = false;
          }
        );
      }

      getGenreDetails(): void {
        for (const book of this.bestsellerBooks) {
          this._bookService.getGenreById(book.genreId).subscribe(
            (genreResponse) => {
              book.genre = genreResponse;
            },
            (error) => {
              console.log('Error fetching genre details:', error);
            }
          );
        }
      }
     
    }
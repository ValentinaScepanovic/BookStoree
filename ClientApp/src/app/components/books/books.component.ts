import { Component, OnInit } from "@angular/core";
import { Book } from "src/app/models/books.model";
import { Genre } from "src/app/models/genres.model";
import { BookService } from "src/app/services/books.service";

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  loading: boolean = true;
  books: Book[] = [];
  genres: Genre[] = [];
  selectedGenre: number;
  filteredBooks: Book[] = [];

  constructor(private _bookService: BookService) { }

  ngOnInit(): void {
    this.getAllGenre();
    this.getAllBooks();
    
  }

  getAllBooks(): void {
    this.loading=true;
    this._bookService.getAllBooks().subscribe(
      (response) => {
        this.books = response;
        this.getGenreDetails();
        this.loading = false;
      },
      (error) => {
        console.log('Error fetching books:', error);
        this.loading = false;
      }
    );
  }

  getAllGenre() {
    this._bookService.getGenres().subscribe(
      (response) => {
        this.genres = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getGenreDetails(): void {
    for (const book of this.books) {
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

  filterBooksByGenre(): void {
  if (this.selectedGenre) {
    const selectedGenreId = Number(this.selectedGenre)
    this.filteredBooks = this.books.filter(book => book.genre.genreID === selectedGenreId);
  }

}
}
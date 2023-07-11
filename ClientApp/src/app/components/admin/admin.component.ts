import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/models/books.model';
import { Genre } from 'src/app/models/genres.model';
import { BookService } from 'src/app/services/books.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{

  formVisible=false;
  formEditVisible=false;
  formDeleteVisible=false;
  loading: boolean = true;
  genres:Genre[]=[];

  imageUrl: string;
  file:File;

  books: Book [] =[];

  newBook: Book ={
    bookId:null,
    bookName:'',
    author:'',
    genreId:0,
    description : '',
    isBestseller: null,
    picture:'',
    price: 0,
    genre: null
  };

  editBook: Book = { 
    bookId: null, 
    bookName: '', 
    author: '', 
    genreId: 0, 
    description : '',
    isBestseller: null,
    picture: '',
    price: 0,
    genre: null
  };

  deleteBook: Book = { 
    bookId: null, 
    bookName: '', 
    author: '', 
    genreId: 0, 
    description : '',
    isBestseller: null,
    picture: '' ,
    price: 0,
    genre: null
  };


  constructor(private _bookService: BookService,
    private router: Router) { }

  ngOnInit(): void {
    this.getAllGenre();
    this._bookService.getAllBooks().subscribe(
      (response) => {
        this.books = response;
        this.loading = false;
      },
      (error) => {
        console.log('Error fetching books:', error);
        this.loading = false;
      }
    );
  }
  getAllGenre(){
    this._bookService.getGenres().subscribe(
      (response) => {
        this.genres = response;
      },
      (error) => {
        console.log(error);
      });
    }

  form() {
    this.formVisible = !this.formVisible;
    this.newBook={
      bookId:null,
      bookName:'',
      author:'',
      genreId:null,
      description : '',
      isBestseller: null,
      picture:'',
      price: null,
      genre: null
    };
  }
  closeEdit(){
    this.formEditVisible = !this.formEditVisible;
  }
  closeDelete(){
    this.formDeleteVisible = !this.formDeleteVisible;
  }

  formEdit(bookId : number) {
    this.formEditVisible = !this.formEditVisible;
    this._bookService.getBookById(bookId).subscribe((book) => {
      this.editBook=book;
      this.editBook.bookId=book.bookId;
      this.editBook.bookName=book.bookName;
      this.editBook.author=book.author;
      this.editBook.genreId=book.genreId;
      this.editBook.description=book.description;
      this.editBook.isBestseller=book.isBestseller;
      this.editBook.picture=book.picture;
      this.editBook.price=book.price;
    });

  }
  formDelete(bookId : number){
    this.formDeleteVisible=!this.formDeleteVisible;
    this._bookService.getBookById(bookId).subscribe((book) => {
      this.deleteBook=book
    });
  }

  onFileSelected(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
    this.newBook.picture = reader.result as string;
  };
  }

  onSubmit() {
    this.formVisible = !this.formVisible;
    this.loading=true;
    this._bookService.addNewBook(this.newBook).subscribe(response => {
      this.books.unshift(response);
      this.books.sort((a, b) => a.author.localeCompare(b.author));
    const index = this.books.findIndex(book => book.author === response.author);
    if (index !== -1) {
      this.books.splice(index, 1);
      this.books.splice(index, 0, response);
    }
     this.refresh();
     this.loading=false;
    });
  }

  editThisBook(bookId : number){
    this.formEditVisible = !this.formEditVisible;
    this.loading=true;
    if(bookId==this.editBook.bookId){
    this._bookService.editBook(bookId, this.editBook).subscribe(response => {
      const index = this.books.findIndex((b) => b.bookId === bookId);
      if (index !== -1) {
        this.books[index] = this.editBook;
      }
      this.refresh();
      this.loading = false;
    });
  }
  }
  
  deleteThisBook() {
    this.loading=true;
    this.formDeleteVisible=!this.formDeleteVisible;
    this._bookService.deleteBook(this.deleteBook.bookId)
      .subscribe(
        response=> {
            this.books.splice(this.deleteBook.bookId);
            this.refresh();
            this.loading=false;
          });
      }

    refresh() {
        this.ngOnInit()
     }
 }



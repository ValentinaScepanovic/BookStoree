import { Genre } from "./genres.model";

export interface Book { 
    bookId: number;
    bookName:string;
    author:string;
    description : string;
    isBestseller: boolean;
    picture: string; 
    genreId: number;
    price: number;
    genre: Genre;
  }
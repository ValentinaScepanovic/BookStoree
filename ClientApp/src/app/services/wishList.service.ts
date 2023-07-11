import { Injectable } from '@angular/core';
import { Book } from '../models/books.model';

@Injectable({
  providedIn: 'root'
})
export class WishListService {
    private localStorageKey = 'wishList';
    wishList: Book[] = [];
  
    constructor() {
      const storedWishList = localStorage.getItem(this.localStorageKey);
      if (storedWishList) {
        this.wishList = JSON.parse(storedWishList);
      }
    }
  
    addToWishList(book: Book): void {
      this.wishList.push(book);
      this.updateLocalStorage();
    }
  
    removeFromWishList(book: Book): void {
      const index = this.wishList.findIndex(b => b.bookId === book.bookId);
      if (index !== -1) {
        this.wishList.splice(index, 1);
        this.updateLocalStorage();
      }
    }
  
    private updateLocalStorage(): void {
      localStorage.setItem(this.localStorageKey, JSON.stringify(this.wishList));
    }
  }
import { EventEmitter, Injectable } from '@angular/core';
import { Book } from '../models/books.model';

@Injectable({
  providedIn: 'root'
})
export class BuyListService {
    private localStorageKey = 'buyList';
    buyList: Book[] = [];
    bookAdded: EventEmitter<void> = new EventEmitter<void>();
  
    constructor() {
      const storedBuyList = localStorage.getItem(this.localStorageKey);
      if (storedBuyList) {
        this.buyList = JSON.parse(storedBuyList);
      }
    }
  
    addToBuyList(book: Book): void {
      this.buyList.push(book);
      this.updateLocalStorage();
      this.bookAdded.emit();
    }
  
    removeFromBuyList(book: Book): void {
      const index = this.buyList.findIndex(b => b.bookId === book.bookId);
      if (index !== -1) {
        this.buyList.splice(index, 1);
        this.updateLocalStorage();
      }
    }

    clearBuyList(): void {
      this.buyList = [];
      this.updateLocalStorage();
    }
  
    private updateLocalStorage(): void {
      localStorage.setItem(this.localStorageKey, JSON.stringify(this.buyList));
    }
  }
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { HomeComponent } from './components/home/home.component';
import { BestSellersComponent } from './components/bestsellers/bestsellers.component';
import { BookComponent } from './components/book/book.component';
import { BooksComponent } from './components/books/books.component';
import { WishListComponent } from './components/wishList/wishList.component';
import { BuyListComponent } from './components/buyList/buyList.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: 'admin', component: AdminComponent},
    { path: 'home', component:HomeComponent},
    { path: 'bestsellers', component:BestSellersComponent},
    { path: 'books', component:BooksComponent},
    { path: 'wishList', component:WishListComponent},
    { path: 'buyList', component:BuyListComponent},
    { path: 'book/:bookId', component: BookComponent },
    { path: '',   redirectTo: '/home', pathMatch: 'full' }
    
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)
],
  exports: [RouterModule]
})
export class AppRoutingModule { }

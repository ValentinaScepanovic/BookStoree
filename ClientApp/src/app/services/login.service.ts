import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from '../models/login.model';
import { Signin } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = '/api/user/';

  constructor(private http: HttpClient) { }

  login(loginDto: Login): Observable<Signin> {
    const url = `${this.apiUrl}login`;
    const params = new HttpParams()
    .set('username', loginDto.userName)
    .set('password', loginDto.password);

    return this.http.get<Signin>(url,{params}); 
  }

  signIn(newUser: Signin): Observable<Signin> {
    const url =`${this.apiUrl}signin`;
    return this.http.post<Signin>(url, newUser);
  }
}
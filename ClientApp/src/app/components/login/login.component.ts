import { Component, OnInit } from '@angular/core';
import { Login, Signin } from 'src/app/models/login.model';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  logVisible=false;
  loading: boolean = true;

  loginFormData:Login={
    userName:'',
    password:''
  }
  signinFormData:Signin={
    name:'',
    email:'',
    userName:'',
    password:''
  }

  constructor(
    private _loginService : LoginService,
    private router: Router
  ){}

  ngOnInit() : void{
    this.loading=false;
  }

  logIn() {
    this.logVisible = !this.logVisible;
    this.refresh();
  }

  onSubmitLogin() {
    this.logVisible = !this.logVisible;
    this.loading=true;
    this._loginService.login(this.loginFormData).subscribe(
      (user: Signin) => {
        console.log(user);
        this.router.navigate(['/admin'])
        this.loading=false;
      },
    (error) => {
      alert('Invalid username or password');
      error.alert;
      this.router.navigate(['/login']);
      this.loading=false;
    });
  }

  refresh() {
    this.loginFormData = {
      userName: '',
      password: ''
    };
 }

}

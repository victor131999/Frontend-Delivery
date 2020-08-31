import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import {Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url : string = "https://proyecto-delivery-typesc-9f79b.web.app/api/auth";
  isLoggedIn = false; //Bandera para determinar si el usuario está logeado o no

  httpOptions={
    headers:new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'      
    })
  };

  constructor(private http:HttpClient, private firebaseAuth : AngularFireAuth) { }

  signup(user : any): Observable<any>  {  
    console.log(user);
    return this.http.post(this.url.concat("/signup"), user, this.httpOptions);    
  }

  async singin(email: string, password :string){
    await this.firebaseAuth.signInWithEmailAndPassword(email, password).then(res=> {
      console.log(res);
      this.isLoggedIn = true;
      localStorage.setItem('user', JSON.stringify(res.user));
    });
  }

  logout(){
    this.firebaseAuth.signOut();
    localStorage.removeItem('user');
  }

}
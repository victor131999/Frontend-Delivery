import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import {Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  url : string = "https://proyecto-delivery-typesc-9f79b.web.app/api/auth/signup";

  httpOptions={
    headers:new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json'      
    })
  };


  signup(user: any):Observable<any>{
    let userBody = JSON.stringify(user);
    return this.http.post(this.url, userBody, this.httpOptions)
  }

}

import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import {Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url : string = "https://proyecto-delivery-typesc-9f79b.web.app/api/auth";

  httpOptions={
    headers:new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'      
    })
  };

  constructor(private http:HttpClient) { }

  signup(user : any): Observable<any>  {  
    console.log(user);
    return this.http.post(this.url.concat("/signup"), user, this.httpOptions);    
  }

}

import { Injectable } from '@angular/core';
import { Customer } from '../../shared/models/customer';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable } from 'rxjs';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  url : string = "https://proyecto-delivery-typesc-9f79b.web.app/api/bills";

  httpOptions={
    headers:new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'      
    })
  };

  constructor(private http:HttpClient) { }
  
}
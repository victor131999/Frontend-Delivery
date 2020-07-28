import { Injectable } from '@angular/core';
import { Customer } from '../../shared/models/customer';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { Bill } from 'src/app/shared/models/bill';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  url : string = "https://proyecto-delivery-typesc-9f79b.web.app/api/bills";

  httpOptions={
    headers:new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'      
    })
  };

  constructor(private http:HttpClient) { }

  save(regs : Bill): Observable<any>  {  
    let regBody = JSON.stringify(regs);
    console.log(regBody);
    if(regs.idbill === undefined){
      return this.http.post<any>(this.url, regBody, this.httpOptions);
    }
    else{
      return this.http.put<any>(this.url.concat('/').concat(regs.idbill), regBody, this.httpOptions);
    }
  }
}
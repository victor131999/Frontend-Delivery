import { Injectable } from '@angular/core';
import { Customer } from '../../shared/models/customer';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, of } from 'rxjs';
import { retry, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  url : string = "https://proyecto-delivery-typesc-9f79b.web.app/api/customers";
  urls : string = "https://proyecto-delivery-typesc-9f79b.web.app/api/page/customers";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json'      
    })
  };

  constructor(private http:HttpClient) { }

  save(customer : Customer): Observable<any>  {  
    let customerBody = JSON.stringify(customer);
    if(customer.idcustomer === undefined){
      return this.http.post<Customer>(this.url, customerBody, this.httpOptions);
    }
    else{
      return this.http.put<Customer>(this.url.concat('/').concat(customer.idcustomer), customerBody, this.httpOptions);
    }
  }
  
  retrieve(id: string): Observable<Customer>  {    
    return this.http.get<Customer>(this.url.concat('/').concat(id), this.httpOptions)
    .pipe(
      retry(1)     
    );
  }

  delete(id: string): Observable<any>  {    
    return this.http.delete<Customer>(this.url.concat('/').concat(id), this.httpOptions);
  }

  count(): Observable<any>  {    
    return this.http.get<any>('https://proyecto-delivery-typesc-9f79b.web.app/api/count/customers', this.httpOptions)
    .pipe(
      retry(1)     
    );
  }

  list(page: number, limit : number): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.urls + "/" + page + "/" + limit, this.httpOptions)
      .pipe(
        retry(1)
      );
  }

  ComboCustomer(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.url , this.httpOptions)
      .pipe(
        retry(1)
      );
  }

}


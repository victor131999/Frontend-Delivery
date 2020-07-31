import { Injectable } from '@angular/core';
import { Customer } from '../../shared/models/customer';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, of } from 'rxjs';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  url : string = "https://proyecto-delivery-typesc-9f79b.web.app/api/customers";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json'      
    })
  };

  constructor(private http:HttpClient) { }

  save(customer : Customer): Observable<any>  {  
    let bodyCustomer = JSON.stringify(customer);
    if(customer.idcustomer === undefined)
    {
      return this.http.post(this.url, bodyCustomer, this.httpOptions);
    }
       return this.http.patch(this.url + '/' + customer.idcustomer, bodyCustomer, this.httpOptions);
    }
  
  retrievee(id: string): Observable<Customer>  {    
    return this.http.get<Customer>(this.url.concat('/').concat(id), this.httpOptions)
    .pipe(
      retry(1)     
    );
  }
  
  delete(id: string): Observable<any>  {    
    return this.http.delete(this.url.concat('/').concat(id), this.httpOptions);
  }

  
  list(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.url, this.httpOptions)
      .pipe(
        retry(1)
      );
  }

}


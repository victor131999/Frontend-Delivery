import { Injectable } from '@angular/core';
import { Customer } from '../../shared/models/customer';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, of } from 'rxjs';
import { retry, catchError, tap } from 'rxjs/operators';
import { Bill } from 'src/app/shared/models/bill';

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

  
  list(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.url, this.httpOptions)
      .pipe(
        retry(1)
      );
  }

  getBills(id: string): Observable<Bill[]> { //Listado de matrículas
    let uri = this.url.concat('/').concat(id).concat('/bills');
    console.log(uri);
    return this.http.get<Bill[]>(uri, this.httpOptions)
      .pipe(
        retry(1)
      );
  }


}


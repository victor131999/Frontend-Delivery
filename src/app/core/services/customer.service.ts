import { Injectable } from '@angular/core';
import { Customer } from '../../shared/models/customer';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable } from 'rxjs';
import { retry} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  url : string = "https://proyecto-delivery-typesc-9f79b.web.app/api/customers";
  urls : string = "https://proyecto-delivery-typesc-9f79b.web.app/api/page/customers";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'      
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

  delete(id: string, token: string): Observable<any>  {  

    const httpHeaders ={
      headers:new HttpHeaders({
        'Content-Type': 'application/json',        
        'Accept': 'application/json',
        'Authorization' : token
      })
    };

    return this.http.delete<Customer>(this.url.concat('/').concat(id), httpHeaders);
  }

  count(): Observable<any>  {    
    return this.http.get<any>('https://proyecto-delivery-typesc-9f79b.web.app/api/count/customers', this.httpOptions)
    .pipe(
      retry(1)     
    );
  }

  list(page: number, limit : number, token: string): Observable<Customer[]> {

    const httpHeaders ={
      headers:new HttpHeaders({
        'Content-Type': 'application/json',        
        'Accept': 'application/json',
        'Authorization' : token
      })
    };

    return this.http.get<Customer[]>(this.urls + "/" + page + "/" + limit, httpHeaders)
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


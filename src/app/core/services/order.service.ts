import { Injectable } from '@angular/core';
import { Order } from '../../shared/models/order';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, of } from 'rxjs';
import { retry, catchError, tap } from 'rxjs/operators';
import { Bill } from 'src/app/shared/models/bill';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  url : string = "https://proyecto-delivery-typesc-9f79b.web.app/api/orders";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json'      
    })
  };

  constructor(private http:HttpClient) { }

  save(order : Order): Observable<any>  {  
    let orderBody = JSON.stringify(order);
    if(order.idorder === undefined){
      return this.http.post<Order>(this.url, orderBody, this.httpOptions);
    }
    else{
      return this.http.put<Order>(this.url.concat('/').concat(order.idorder), orderBody, this.httpOptions);
    }
  }
  
  retrieve(id: string): Observable<Order>  {    
    return this.http.get<Order>(this.url.concat('/').concat(id), this.httpOptions)
    .pipe(
      retry(1)     
    );
  }

  delete(id: string): Observable<any>  {    
    return this.http.delete<Order>(this.url.concat('/').concat(id), this.httpOptions);
  }

  
  list(): Observable<Order[]> {
    return this.http.get<Order[]>(this.url, this.httpOptions)
      .pipe(
        retry(1)
      );
  }


  getBills(id: string): Observable<Bill[]> { 
    let uri = this.url.concat('/').concat(id).concat('/bills');
    console.log(uri);
    return this.http.get<Bill[]>(uri, this.httpOptions)
      .pipe(
        retry(1)
      );
  }
}


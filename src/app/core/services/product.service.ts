import { Injectable } from '@angular/core';
import { Product } from '../../shared/models/product';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, of } from 'rxjs';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url : string = "https://proyecto-delivery-typesc-9f79b.web.app/api/products";
  urls : string = "https://proyecto-delivery-typesc-9f79b.web.app/api/page/products";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json'      
    })
  };

  constructor(private http:HttpClient) { }

  save(product : Product): Observable<any>  {  
    let productBody = JSON.stringify(product);
    if(product.idproduct === undefined){
      return this.http.post<Product>(this.url, productBody, this.httpOptions);
    }
    else{
      return this.http.put<Product>(this.url.concat('/').concat(product.idproduct), productBody, this.httpOptions);
    }
  }
  
  retrieve(id: string): Observable<Product>  {    
    return this.http.get<Product>(this.url.concat('/').concat(id), this.httpOptions)
    .pipe(
      retry(1)     
    );
  }

  delete(id: string): Observable<any>  {    
    return this.http.delete<Product>(this.url.concat('/').concat(id), this.httpOptions);
  }

  count(): Observable<any>  {    
    return this.http.get<any>('https://proyecto-delivery-typesc-9f79b.web.app/api/count/products', this.httpOptions)
    .pipe(
      retry(1)     
    );
  }

  list(page: number, limit : number): Observable<Product[]> {
    return this.http.get<Product[]>(this.urls + "/" + page + "/" + limit, this.httpOptions)
      .pipe(
        retry(1)
      );
  }


}


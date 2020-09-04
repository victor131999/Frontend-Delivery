import { Injectable } from '@angular/core';
import { Charge } from '../../shared/models/charge';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, of } from 'rxjs';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChargeService {

  url : string = "https://proyecto-delivery-typesc-9f79b.web.app/api/charges";
  urls : string = "https://proyecto-delivery-typesc-9f79b.web.app/api/page/charges";


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json'      
    })
  };

  constructor(private http:HttpClient) { }


  save(charge : Charge): Observable<any>  {  
    let chargeBody = JSON.stringify(charge);
    if(charge.idcharge === undefined){
      return this.http.post<Charge>(this.url, chargeBody, this.httpOptions);
    }
    else{
      return this.http.put<Charge>(this.url.concat('/').concat(charge.idcharge), chargeBody, this.httpOptions);
    }
  }
  
  retrieve(id: string): Observable<Charge>  {    
    return this.http.get<Charge>(this.url.concat('/').concat(id), this.httpOptions)
    .pipe(
      retry(1)     
    );
  }

  count(): Observable<any>  {    
    return this.http.get<any>('https://proyecto-delivery-typesc-9f79b.web.app/api/count/charges', this.httpOptions)
    .pipe(
      retry(1)     
    );
  }

  delete(id: string): Observable<any>  {    
    return this.http.delete<Charge>(this.url.concat('/').concat(id), this.httpOptions);
  }

  
  list(page: number, limit : number, token: string): Observable<Charge[]> {

    const httpHeaders ={
      headers:new HttpHeaders({
        'Content-Type': 'application/json',        
        'Accept': 'application/json',
        'Authorization' : token
      })
    };


    return this.http.get<Charge[]>(this.urls + "/" + page + "/" + limit, httpHeaders)
      .pipe(
        retry(1)
      );
  }

  countChargesCustomer1(): Observable<any>  {    
    return this.http.get<any>('https://proyecto-delivery-typesc-9f79b.web.app/api/charges/count/customer1/VR2xKR9m4hMHoXD7jD7d', this.httpOptions)
    .pipe(
      retry(1)     
    );
  }

  countChargesCustomer2(): Observable<any>  {    
    return this.http.get<any>('https://proyecto-delivery-typesc-9f79b.web.app/api/charges/count/customer2/2O1xXVNZ6nnZy4N0pfXY', this.httpOptions)
    .pipe(
      retry(1)     
    );
  }

  countChargesCustomer3(): Observable<any>  {    
    return this.http.get<any>('https://proyecto-delivery-typesc-9f79b.web.app/api/charges/count/customer3/5fEo3I5iWIpPEKmyc1F8', this.httpOptions)
    .pipe(
      retry(1)     
    );
  }

  countChargesCustomer4(): Observable<any>  {    
    return this.http.get<any>('https://proyecto-delivery-typesc-9f79b.web.app/api/charges/count/customer4/IH3x9Sj3KYsddPgytQmE', this.httpOptions)
    .pipe(
      retry(1)     
    );
  }

  countChargesCustomer5(): Observable<any>  {    
    return this.http.get<any>('https://proyecto-delivery-typesc-9f79b.web.app/api/charges/count/customer5/Oi5HuCyWxFwm17XOSice', this.httpOptions)
    .pipe(
      retry(1)     
    );
  }
}

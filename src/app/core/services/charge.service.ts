import { Injectable } from '@angular/core';
import { Charge } from '../../shared/models/charge';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, of } from 'rxjs';
import { retry, catchError, tap } from 'rxjs/operators';

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

  
  list(page: number, limit : number): Observable<Charge[]> {
    return this.http.get<Charge[]>(this.urls + "/" + page + "/" + limit, this.httpOptions)
      .pipe(
        retry(1)
      );
  }
}

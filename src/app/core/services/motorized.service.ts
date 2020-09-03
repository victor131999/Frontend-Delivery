import { Injectable } from '@angular/core';
import { Motorized } from '../../shared/models/motorized';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MotorizedService {

  url : string = "https://proyecto-delivery-typesc-9f79b.web.app/api/motorizeds";
  urls : string = "https://proyecto-delivery-typesc-9f79b.web.app/api/page/motorizeds";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'      
    })
  };

  constructor(private http:HttpClient) { }

  save(motorized : Motorized,): Observable<any>  {  


    let motorizedBody = JSON.stringify(motorized);
    if(motorized.idmotorized === undefined){
      return this.http.post<Motorized>(this.url, motorizedBody,this.httpOptions);
    }
    else{
      return this.http.put<Motorized>(this.url.concat('/').concat(motorized.idmotorized), motorizedBody, this.httpOptions);
    }
  }
  
  retrieve(id: string): Observable<Motorized>  {    
    return this.http.get<Motorized>(this.url.concat('/').concat(id), this.httpOptions)
    .pipe(
      retry(1)     
    );
  }

  count(): Observable<any>  {    
    return this.http.get<any>('https://proyecto-delivery-typesc-9f79b.web.app/api/count/motorizeds', this.httpOptions)
    .pipe(
      retry(1)     
    );
  }

  delete(id: string): Observable<any>  {    
    return this.http.delete<Motorized>(this.url.concat('/').concat(id), this.httpOptions);
  }

  
  list(page: number, limit : number, token: string): Observable<Motorized[]> {

    const httpHeaders ={
      headers:new HttpHeaders({
        'Content-Type': 'application/json',        
        'Accept': 'application/json',
        'Authorization' : token
      })
    };

    return this.http.get<Motorized[]>(this.urls + "/" + page + "/" + limit, httpHeaders)
      .pipe(
        retry(1)
      );
  }

  ComboMotorized(): Observable<Motorized[]> {
    return this.http.get<Motorized[]>(this.url , this.httpOptions)
      .pipe(
        retry(1)
      );
  }
}


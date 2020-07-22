import { Injectable } from '@angular/core';
import { Motorized } from '../../shared/models/motorized';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, of } from 'rxjs';
import { retry, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MotorizedService {

  url : string = "https://proyecto-delivery-typesc-9f79b.web.app/api/motorizeds";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json'      
    })
  };

  constructor(private http:HttpClient) { }

  save(motorized : Motorized): Observable<any>  {  
    let motorizedBody = JSON.stringify(motorized);
    if(motorized.idmotorized === undefined){
      return this.http.post<Motorized>(this.url, motorizedBody, this.httpOptions);
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

  delete(id: string): Observable<any>  {    
    return this.http.delete<Motorized>(this.url.concat('/').concat(id), this.httpOptions);
  }

  
  list(): Observable<Motorized[]> {
    return this.http.get<Motorized[]>(this.url, this.httpOptions)
      .pipe(
        retry(1)
      );
  }
}


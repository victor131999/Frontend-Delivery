import { Injectable } from '@angular/core';
import { Local } from '../../shared/models/local';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, of } from 'rxjs';
import { retry, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  url : string = "https://proyecto-delivery-typesc-9f79b.web.app/api/locals";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json'      
    })
  };

  constructor(private http:HttpClient) { }

  save(local : Local): Observable<any>  {  
    let localBody = JSON.stringify(local);
    if(local.idlocal === undefined){
      return this.http.post<Local>(this.url, localBody, this.httpOptions);
    }
    else{
      return this.http.put<Local>(this.url.concat('/').concat(local.idlocal), localBody, this.httpOptions);
    }
  }
  
  retrieve(id: string): Observable<Local>  {    
    return this.http.get<Local>(this.url.concat('/').concat(id), this.httpOptions)
    .pipe(
      retry(1)     
    );
  }

  delete(id: string): Observable<any>  {    
    return this.http.delete<Local>(this.url.concat('/').concat(id), this.httpOptions);
  }

  
  list(): Observable<Local[]> {
    return this.http.get<Local[]>(this.url, this.httpOptions)
      .pipe(
        retry(1)
      );
  }

  listPage(limit:number,last:number): Observable<Local[]> {
   let limite=String(limit);
   let laste=String(last);
    return this.http.get<Local[]>(this.url.concat('/').concat(limite).concat('/').concat(laste), this.httpOptions)
      .pipe(
        retry(1)
      );
  }

}


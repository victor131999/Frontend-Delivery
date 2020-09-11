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
  urls : string = "https://proyecto-delivery-typesc-9f79b.web.app/api/page/locals";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json'      
    })
  };

  constructor(private http:HttpClient) { }

  save(local : Local, token: string): Observable<any>  {  

    const httpHeaders ={
      headers:new HttpHeaders({
        'Content-Type': 'application/json',        
        'Accept': 'application/json',
        'Authorization' : token
      })
    };

    let localBody = JSON.stringify(local);
    if(local.idlocal === undefined){
      return this.http.post<Local>(this.url, localBody, httpHeaders);
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

  count(): Observable<any>  {    
    return this.http.get<any>('https://proyecto-delivery-typesc-9f79b.web.app/api/count/locals', this.httpOptions)
    .pipe(
      retry(1)     
    );
  }

  list(page: number, limit : number, token: string): Observable<Local[]> {

    const httpHeaders ={
      headers:new HttpHeaders({
        'Content-Type': 'application/json',        
        'Accept': 'application/json',
        'Authorization' : token
      })
    };


    return this.http.get<Local[]>(this.urls + "/" + page + "/" + limit, httpHeaders)
      .pipe(
        retry(1)
      );
  }

  ComboLocal(): Observable<Local[]> {
    return this.http.get<Local[]>(this.url , this.httpOptions)
      .pipe(
        retry(1)
      );
  }

}



import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/do'
import Swal from 'sweetalert2';

@Injectable()
export class ServiceInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, response: HttpHandler): Observable<HttpEvent<unknown>> {
    return response.handle(request).do(
      next => {
        if(next instanceof HttpResponse){
          console.log(next);
          if(next.status === 201){
            Swal.fire(next.body);
          }          
        }
      },
      err => {
        console.error(err);
        if(err.status === 400){
          Swal.fire(err.error);
        }
        
        if(err.status === 401){
          Swal.fire({
            title : "No autorizado",
            text : err.error.message,
            icon : "error"
          });
        }

        if(err.status === 403){
          Swal.fire({
            title : "No autorizado",
            text : err.error.message,
            icon : "warning"
          });
        }
      }
    );
  }
}
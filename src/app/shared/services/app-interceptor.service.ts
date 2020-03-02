import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {ToasterService} from 'angular2-toaster';

@Injectable({
  providedIn: 'root',
})

export class AppInterceptorService implements HttpInterceptor {

  constructor(private toaster: ToasterService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headers = this.setHeaders();

    const clone = req.clone({
      headers: headers,
    });

    return next.handle(clone)
      .pipe(
        catchError((error) => this.handelError(error))
      );
  }

  setHeaders(): HttpHeaders {
    try {
      const headersConfig = {
        'Content-type': 'application/json',
        'Authorization': ``,
      };
      return new HttpHeaders(headersConfig);
    } catch (err) {
      return null;
    }
  }

  handelError(error: HttpErrorResponse) {
    if (error) {
      this.toaster.pop('error', error.message);
    }
    console.log('Error occurred:');
    console.log(error);
    return throwError(error);
  }
}

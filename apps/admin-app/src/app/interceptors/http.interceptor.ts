import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(private readonly authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (!request.url.includes('api/auth') && this.authService.getAuthToken()) {
      request = this.addAuthHeaderTo(request);
    }
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status == 401) {
            console.error('Unauthorized or login failed.');
            this.authService.logout();
          }
          if (error.status == 405) {
            console.error('Request method is not allowed.');
          }
        } else {
          console.error('this is client side error');
        }
        return throwError(error);
      })
    );
  }

  private addAuthHeaderTo(request: HttpRequest<unknown>): HttpRequest<unknown> {
    return request.clone({
      setHeaders: {
        Authorization: 'Bearer ' + this.authService.getAuthToken(),
      },
    });
  }
}

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../Auth/auth.service';
import { exhaustMap, take } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authservice:AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.authservice.user.pipe(take(1),
    exhaustMap(user=>{
      if(!user){
        return next.handle(request);
      }
      const modifiedReq = request.clone({
        setHeaders:{ Authorization: `Bearer ${user._token}`}
      });
      return next.handle(modifiedReq);
    })
    );
  }
}

import { Injectable } from '@angular/core';

import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';

const baseUrl = 'https://opentdb.com/api.php';

@Injectable({
  providedIn: 'root',
})
export class HttpInterceptorService implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const modifiedRequest: HttpRequest<any> = request.clone({
      url: baseUrl + request.url,
      params: request.params.append('type', 'multiple'),
    });
    return next.handle(modifiedRequest);
  }
}

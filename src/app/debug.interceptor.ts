// debug.interceptor.ts
import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export const DebugInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  console.log('DEBUG INTERCEPTOR - Request:', req);
  return next(req).pipe(
    tap({
      next: (event) => console.log('DEBUG INTERCEPTOR - Response:', event),
      error: (err) => console.error('DEBUG INTERCEPTOR - Error:', err)
    })
  );
};

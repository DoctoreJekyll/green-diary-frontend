import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
const router = inject(Router);

return next(req).pipe(
catchError((error: HttpErrorResponse) => {
if (error.status === 401) {
// Si el token expira o no es válido
console.warn('⚠️ Sesión expirada o no autorizada');
localStorage.removeItem('token');
localStorage.removeItem('user');
router.navigate(['/login'], { queryParams: { expired: 'true' } });
} else if (error.status === 0) {
console.error('❌ Error de red o CORS:', error.message);
} else {
console.error(`🚨 Error HTTP ${error.status}:`, error.message);
}

  // Reemitimos el error para que el componente pueda manejarlo si quiere
  return throwError(() => error);
})

);
};

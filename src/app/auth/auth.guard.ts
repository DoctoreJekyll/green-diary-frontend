import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (auth.isLoggedIn()) return true;
  // guardamos a donde quería ir y redirigimos al login
  router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
  return false;
};

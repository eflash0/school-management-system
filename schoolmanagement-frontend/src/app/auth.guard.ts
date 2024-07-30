import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from './services/login.service';
import { inject } from '@angular/core';
import { catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);
  return loginService.validateToken().pipe(
    map(response => {
      if (response) {
        return true;
      } else {
        router.navigate(['/login']);
        return false;
      }
    }),
    catchError(error => {
      console.log('error during the validation of the token', error);
      router.navigate(['/login']);
      return of(false);
    })
  );
};

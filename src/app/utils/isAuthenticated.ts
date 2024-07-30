import { inject } from '@angular/core';
import { Router } from '@angular/router';

export function isAuthenticated(): boolean {
  const router = inject(Router);
  const userIsLoggedIn = localStorage.getItem('isLoggedIn');

  if (userIsLoggedIn) {
    return true;
  } else {
    router.navigate(['/']);
    return false;
  }
}

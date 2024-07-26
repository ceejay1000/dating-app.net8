import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AccountsService } from '../_services/accounts.service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const accountService = inject(AccountsService);

  if (accountService.currentUser()) {
    let reqClone = req.clone({
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${accountService.currentUser()?.token}`
      ),
    });
    return next(reqClone);
  }
  return next(req);
};

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements  CanActivate{

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    if (this.authService.getIsLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
  cantActivate(){
    if(this.authService.getIsLoggedIn()){
      this.router.navigate(['login']);
    }
    return false;
  }
}

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { LoginService } from './login/login.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private loginService: LoginService, private router: Router) {
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.checkLogin(next)) {
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }

    private checkLogin(next: ActivatedRouteSnapshot) {
        if (next.component['name'] === 'UsersComponent') {
            return this.loginService.isAdmin;
        }
        return this.loginService.isLoggedIn;
    }
}

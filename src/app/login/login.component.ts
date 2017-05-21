import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    constructor(private loginService: LoginService, private router: Router) {
    }

    ngOnInit(): void {
        if (this.loginService.isLoggedIn) {
            this.router.navigate(['/dashboard']);
        }
    }

    public onLogin(): void {
        this.loginService.login();
    }
}

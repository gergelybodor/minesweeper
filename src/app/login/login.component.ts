import { Component } from '@angular/core';
import { LoginService } from './login.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {

    constructor(private loginService: LoginService) {
    }

    public onLogin(): void {
        this.loginService.login();
    }
}

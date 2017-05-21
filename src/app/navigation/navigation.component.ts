import { Component } from '@angular/core';
import { LoginService } from '../login/login.service';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

    constructor(private ls: LoginService) {
    }

    public onLogout(): void {
        this.ls.logout();
    }

    public isAdmin(): boolean {
        return this.ls.isAdmin;
    }

    public getProfilePictureUrl(): string {
        return this.ls.user.photoURL;
    }
}

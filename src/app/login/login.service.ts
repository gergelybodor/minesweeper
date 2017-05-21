import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/filter';

interface IUser {
    uid?: string;
    photoUrl?: string;
    displayName?: string;
    photoURL?: string;
    email?: string;
    isAdmin?: boolean;
}

@Injectable()
export class LoginService {
    private _isLoggedIn = false;
    private _isAdmin = false;
    private _userUid: string;
    private _user: IUser;
    private _userProjects: string[] = [];

    get isLoggedIn(): boolean {
        if (!this._isLoggedIn) {
            return localStorage.getItem('isLoggedIn') === 'true';
        }
        return this._isLoggedIn;
    }

    set isLoggedIn(value: boolean) {
        localStorage.setItem('isLoggedIn', value ? 'true' : 'false');
        this._isLoggedIn = value;
    }

    get isAdmin(): boolean {
        if (!this._isAdmin) {
            return localStorage.getItem('isAdmin') === 'true';
        }
        return this._isAdmin;
    }

    set isAdmin(value: boolean) {
        this._isAdmin = value;
        localStorage.setItem('isAdmin', value ? 'true' : 'false');
    }

    get userUid(): string {
        if (!this._userUid) {
            return JSON.parse(localStorage.getItem('user')).uid;
        }
        return this._userUid;
    }

    set userUid(value: string) {
        this._userUid = value;
    }

    get user(): IUser {
        if (!this._user) {
            return JSON.parse(localStorage.getItem('user'));
        }
        return this._user;
    }

    set user(value: IUser) {
        this._user = value;
        localStorage.setItem('user', JSON.stringify(value));
    }

    get userProjects(): string[] {
        if (!this._userProjects) {
            return JSON.parse(localStorage.getItem('userProjects'));
        }
        return this._userProjects;
    }

    set userProjects(value: string[]) {
        this._userProjects = value;
        localStorage.setItem('userProjects', JSON.stringify(value));
    }

    constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase, private router: Router) {
    }

    public login(): void {
        if (!this.isLoggedIn) {
            this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(() => {
                this.afAuth.authState.filter(user => !!user).subscribe((user: IUser) => {
                    this.isLoggedIn = true;
                    this.userUid = user.uid;
                    this.user = user;
                    this.updateUser(user);
                    this.setIsAdmin(user);
                    this.getUserProjects();
                    this.router.navigate(['/dashboard']);
                });
            });
        }
    }

    public logout(): void {
        this.afAuth.auth.signOut().then(() => {
            this.isLoggedIn = false;
            this.isAdmin = false;
            localStorage.clear();
            this.router.navigate(['/login']);
        });
    }

    public getUserProjects() {
        this.db.object('/users/' + this.userUid + '/projects').subscribe(
            (projects: string[])=> {
                this.userProjects = projects;
            },
            error => console.error(error)
        );
    }

    private updateUser(user: IUser) {
        this.db.object('/users/' + user.uid)
            .take(1)
            .subscribe(
                data => {
                    if (!data.$value) {
                        this.db.object('/users/' + user.uid).update({
                            displayName: user.displayName,
                            photoUrl: user.photoURL,
                            email: user.email
                        });
                    }
                },
                error => console.error(error)
            );
    }

    private setIsAdmin(user: IUser) {
        this.db.object('/users/' + user.uid + '/isAdmin').subscribe(
            data => {
                if (!data.$value) {
                    this.db.object('/users/' + user.uid + '/isAdmin').set(false);
                } else {
                    this.isAdmin = !!data.$value;
                }
            },
            error => console.error(error)
        );
    }
}

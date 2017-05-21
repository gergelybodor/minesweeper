import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { IProject, ProjectService } from '../dashboard/project.service';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
    public selectedProject: IProject = undefined;

    constructor(private ls: LoginService, private ps: ProjectService) {
    }

    ngOnInit(): void {
        if (!this.selectedProject) {
            this.selectedProject = this.ps.selectedProject;
        }
        this.ps.selectedProjectEmitter.subscribe((selectedProject: IProject) => {
            if (selectedProject) {
                this.selectedProject = {
                    id: selectedProject.id,
                    route: selectedProject.route,
                    name: selectedProject.name,
                    description: selectedProject.description
                };
            } else {
                this.selectedProject = undefined;
            }
        });
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

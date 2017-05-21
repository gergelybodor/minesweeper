import { Component, OnInit } from '@angular/core';
import { IProject, ProjectService } from './project.service';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    public projects: IProject[] = [];

    constructor(private ls: LoginService, private ps: ProjectService, private router: Router) {
    }

    ngOnInit(): void {
        if (this.ps.selectedProject) {
            this.ps.selectedProject = undefined;
        }
        if (!this.ls.userProjects.length) {
            this.ls.getUserProjects();
        }
        this.ps.getProjects(projects => {
            this.projects = projects.filter((project: IProject) => {
                return this.ls.userProjects.indexOf(project.id) > -1;
            });
        });
    }

    public navigateTo(selectedProject: IProject): void {
        this.ps.selectedProject = selectedProject;
        this.router.navigate([selectedProject.route]);
    }
}

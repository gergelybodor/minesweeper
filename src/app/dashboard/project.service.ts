import { EventEmitter, Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

export interface IProject {
    id?: string;
    name?: string;
    description?: string;
    route?: string;
}

@Injectable()
export class ProjectService {
    private _selectedProject: any;
    public selectedProjectEmitter: EventEmitter<any> = new EventEmitter();

    get selectedProject(): IProject {
        if (!this._selectedProject) {
            const storedSelectedProject = localStorage.getItem('selectedProject');
            if (storedSelectedProject === 'undefined') {
                return undefined;
            } else {
                return JSON.parse(localStorage.getItem('selectedProject'));
            }
        }
        return this._selectedProject;
    }

    set selectedProject(value: IProject) {
        this._selectedProject = value;
        this.selectedProjectEmitter.emit(value);
        localStorage.setItem('selectedProject', JSON.stringify(value));
    }

    constructor(private db: AngularFireDatabase) {
    }

    public getProjects(callback: (projects: IProject[]) => void) {
        this.db.object('/projects').subscribe(
            (projects: IProject[]) => {
                callback(projects);
            },
            error => console.error(error)
        );
    }
}

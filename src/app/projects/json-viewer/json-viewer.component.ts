import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DATA } from './json-viewer-data';

@Component({
    selector: 'app-json-viewer',
    templateUrl: './json-viewer.component.html',
    styleUrls: ['./json-viewer.component.scss']
})
export class JsonViewerComponent implements OnInit, OnChanges {
    @Input() public display = '';
    @Input() public json: any = [];
    public show: boolean[] = [];
    public titles: any[] = [];

    constructor() {
    }

    ngOnInit() {
        // Fake inputs
        this.display = 'detail.position';
        this.json = DATA;

        this.init();
    }

    ngOnChanges(changes?: SimpleChanges) {
        this.init();
    }

    public toggleShow(index: number): void {
        this.show[index] = !this.show[index];
    }

    private init() {
        this.show = [];
        if (this.json) {
            for (let i = 0; i < this.json.length; i++) {
                this.show.push(false);
            }
            this.createTitles();
        }
    }

    private getDeepValue(obj, path): any {
        path = path.split('.');
        for (let i = 0; i < path.length; i++) {
            if (obj[path[i]]) {
                obj = obj[path[i]];
            } else {
                return 'Unknown';
            }
        }
        return obj;
    }

    private createTitles(): void {
        this.titles = [];
        if (this.display) {
            const attributePath = this.display.split('.');
            for (const element of this.json) {
                this.titles.push(this.getTitle(element, attributePath));
            }
        }
    }

    private getTitle(element: any, attributePath: string[]): string {
        let title = element;
        for (const attribute of attributePath) {
            if (title[attribute]) {
                title = title[attribute];
            } else {
                return 'Unknown';
            }
        }

        return title;
    }
}

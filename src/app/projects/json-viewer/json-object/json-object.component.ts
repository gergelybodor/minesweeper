import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-json-object',
    templateUrl: './json-object.component.html',
    styleUrls: ['./json-object.component.scss']
})
export class JsonObjectComponent implements OnInit {
    @Input() object: any;
    @Input() isOpen: boolean;
    public items: any[] = [];
    public show: boolean[] = [];

    constructor() {
    }

    ngOnInit() {
        for (const item of Object.keys(this.object)) {
            if (this.object.hasOwnProperty(item)) {
                this.items.push(item);
                this.show.push(false);
            }
        }
    }

    public isObject(item: any): boolean {
        return typeof item === 'object' && !Array.isArray(item) && item !== null;
    }

    public isArray(item: any): boolean {
        return Array.isArray(item);
    }

    public isObjectOrArray(item: any): boolean {
        return this.isObject(item) || this.isArray(item);
    }

    public isNull(item: any): boolean {
        return item === null;
    }

    public isNumber(item: any): boolean {
        return typeof item === 'number';
    }

    public isString(item: any): boolean {
        return typeof item === 'string';
    }

    public isBoolean(item: any): boolean {
        return typeof item === 'boolean';
    }

    public toggleShow(index: number): void {
        this.show[index] = !this.show[index];
    }
}

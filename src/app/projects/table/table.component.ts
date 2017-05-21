import { Component, OnInit } from '@angular/core';
import { TableService } from './table.service';

export const ASCENDING_ORDER = 'ASC';
export const DESCENDING_ORDER = 'DESC';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
    public tableItems: ITableItem[] = [];
    public sortField = 'group';
    public sortOrder = ASCENDING_ORDER;
    public filter: FilterObject;

    constructor(private tableService: TableService) {
    }

    ngOnInit() {
        this.tableService.getHarvestData(100).subscribe(
            (result: ITableItem[]) => {
                this.tableItems = result;
                this.filter = new FilterObject();
            },
            error => console.error(error)
        );
    }


    public setOrder(fieldType: string): void {
        if (this.sortField === fieldType) {
            this.sortOrder = this.getReverseOrder(this.sortOrder);
        } else {
            this.sortField = fieldType;
            this.sortOrder = ASCENDING_ORDER;
        }
    }

    public isSortedField(field: string, ascending: boolean): boolean {
        if (ascending) {
            return this.sortField === field && this.sortOrder === ASCENDING_ORDER;
        } else {
            return this.sortField === field && this.sortOrder === DESCENDING_ORDER;
        }
    }

    public getSortIconClassFor(value: string): any {
        return {
            'sort-icon fa fa-fw': true,
            'fa-sort': !this.isSortedField(value, true) && !this.isSortedField(value, false),
            'fa-sort-desc': this.isSortedField(value, true),
            'fa-sort-asc': this.isSortedField(value, false)
        };
    }

    private getReverseOrder(order: string): string {
        return order === ASCENDING_ORDER ? DESCENDING_ORDER : ASCENDING_ORDER;
    }
}

export interface ITableItem {
    group: string;
    name: string;
    category: {
        root: string;
        main: string;
        sub: string;
    };
    time: {
        start: Date;
        end: Date;
        duration: number;
        refresh: number;
    };
    error: string;
    count: {
        all: number;
        valid: number;
        error: number;
    };
}

export interface IFilterObject {
    group: string;
    name: string;
    category: {
        root: string;
        main: string;
        sub: string;
    };
}

export class FilterObject implements IFilterObject {
    group: string;
    name: string;
    category: {
        root: string;
        main: string;
        sub: string;
    };

    constructor() {
        this.group = '';
        this.name = '';
        this.category = {
            root: '',
            main: '',
            sub: ''
        };
    }
}

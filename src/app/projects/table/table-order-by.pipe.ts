import { Pipe, PipeTransform } from '@angular/core';
import { ASCENDING_ORDER, ITableItem } from './table.component';

@Pipe({
    name: 'tableOrderBy'
})
export class TableOrderByPipe implements PipeTransform {

    transform(value: ITableItem[], sortField: string, sortOrder: string): ITableItem[] {
        if (!value.length) {
            return value;
        }
        const order = sortOrder === ASCENDING_ORDER ? 1 : -1;
        return value.sort((some, other) => {
            const a = sortField.indexOf('.') > -1 ? this.getDeepValue(some, sortField) : some[sortField];
            const b = sortField.indexOf('.') > -1 ? this.getDeepValue(other, sortField) : other[sortField];
            return a > b ? order : a < b ? order * -1 : 0;
        });
    }

    private getDeepValue(obj, path): any {
        path = path.split('.');
        for (let i = 0; i < path.length; i++) {
            obj = obj[path[i]];
        }
        return obj;
    }
}

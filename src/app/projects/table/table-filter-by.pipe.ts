import { Pipe, PipeTransform } from '@angular/core';
import { FilterObject, ITableItem } from './table.component';

@Pipe({
    name: 'tableFilterBy',
    pure: false
})
export class TableFilterByPipe implements PipeTransform {

    transform(value: ITableItem[], filterObject: FilterObject): ITableItem[] {
        const propertyPaths: string[] = this.getAllPropertyPathsOfObject(filterObject);
        const validFilterPaths: string[] = propertyPaths.filter((path: string) => {
            return path.indexOf('.') > -1 ? this.getDeepValue(filterObject, path) : filterObject[path];
        });
        if (!validFilterPaths.length) {
            return value;
        }

        const arrayOfFilteredItems: ITableItem[][] = [];
        for (const path of validFilterPaths) {
            const filteredItems = value.filter((tableItem: ITableItem) => {
                const filterValue = path.indexOf('.') > -1 ? this.getDeepValue(filterObject, path) : filterObject[path];
                const tableItemValue = path.indexOf('.') > -1 ? this.getDeepValue(tableItem, path) : tableItem[path];
                return filterValue && tableItemValue.indexOf(filterValue) > -1;
            });
            if (filteredItems.length) {
                arrayOfFilteredItems.push(filteredItems);
            }
        }
        return this.getIntersectionOfArrays(arrayOfFilteredItems);
    }

    private getAllPropertyPathsOfObject(object: any): string[] {
        if (object instanceof Object) {
            const paths: string[] = [];
            for (const key in object) {
                if (object.hasOwnProperty(key)) {
                    if (object[key] instanceof Object) {
                        const nestedPaths: string[] = this.getAllPropertyPathsOfObject(object[key]);
                        nestedPaths.forEach(nestedPath => {
                            paths.push(key + '.' + nestedPath);
                        });
                        continue;
                    }
                    paths.push(key);
                }
            }
            return paths;
        }
        return [];
    }

    private getDeepValue(obj, path): any {
        path = path.split('.');
        for (let i = 0; i < path.length; i++) {
            obj = obj[path[i]];
        }
        return obj;
    }

    private getIntersectionOfArrays(arrays: any[]): any[] {
        if (arrays.length) {
            return arrays.shift().filter((v) => {
                return arrays.every((a) => {
                    return a.indexOf(v) !== -1;
                });
            });
        }
        return [];
    }
}

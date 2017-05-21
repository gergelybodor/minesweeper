import { Injectable } from '@angular/core';
import { ITableItem } from './table.component';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

const loremIpsum = 'marzipan oat cake muffin cake powder apple pie jelly beans carrot cake brownie dragée ' +
    'macaroon jujubes donut bonbon cake candy candy topping dessert chocolate cake sweet roll croissant ' +
    'jelly jujubes wafer jelly marshmallow apple pie danish pudding sugar plum gummies brownie cookie ' +
    'chupa chups dessert pastry sesame snaps donut gingerbread marshmallow fruitcake gummies tiramisu ' +
    'topping topping gingerbread lemon drops icing soufflé carrot cake muffin powder chocolate cake ' +
    'cupcake marzipan tootsie roll gummies marshmallow powder brownie pastry jelly-o carrot cake dessert ' +
    'sesame snaps marshmallow croissant jujubes cake pie biscuit gummi bears caramels tart cheesecake ' +
    'liquorice oat cake';

@Injectable()
export class TableService {

    constructor() {
    }

    public getHarvestData(num: number): Observable<ITableItem[]> {
        return Observable.of(this.getFakeTableItems(num));
    }

    private getFakeTableItems(num: number): ITableItem[] {
        const tableItems: ITableItem[] = [];
        for (let i = 0; i < num; i++) {
            const newTableItem: ITableItem = {
                group: this.getFakeText(0, 1),
                name: this.getFakeText(0, 2),
                category: {
                    root: this.getFakeText(),
                    main: this.getFakeText(),
                    sub: this.getFakeText()
                },
                time: {
                    start: new Date(),
                    end: new Date(),
                    duration: Math.floor(Math.random() * 200),
                    refresh: Math.floor(Math.random() * 200)
                },
                error: 'Error: ' + this.getFakeText(0, 5),
                count: {
                    all: Math.floor(Math.random() * 200),
                    valid: Math.floor(Math.random() * 200),
                    error: Math.floor(Math.random() * 10)
                }
            };
            tableItems.push(newTableItem);
        }
        return tableItems;
    }

    private getFakeText(index?: number, wordNum?: number): string {
        wordNum = wordNum ? Math.floor(Math.random() * (wordNum - 1 + 1)) + 1 : 3;
        index = index ? index : Math.floor(Math.random() * (loremIpsum.split(' ').length - wordNum));
        return loremIpsum.split(' ').slice(index, index + wordNum).join(' ');
    }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableRoutingModule } from './table-routing.module';

import { TableComponent } from './table.component';
import { TableFilterByPipe } from './table-filter-by.pipe';
import { TableOrderByPipe } from './table-order-by.pipe';

import { TableService } from './table.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TableRoutingModule
    ],
    declarations: [
        TableComponent,
        TableFilterByPipe,
        TableOrderByPipe
    ],
    providers: [
        TableService
    ]
})
export class TableModule {
}

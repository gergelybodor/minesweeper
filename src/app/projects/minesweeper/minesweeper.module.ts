import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MinesweeperRoutingModule } from './minesweeper-routing.module';
import { MinesweeperComponent } from './minesweeper.component';

@NgModule({
    imports: [
        CommonModule,
        MinesweeperRoutingModule
    ],
    declarations: [
        MinesweeperComponent
    ]
})
export class MinesweeperModule {
}

import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Minesweeper } from './minesweeper';

@Component({
  selector: 'app-minesweeper',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './minesweeper.component.html',
  styleUrls: ['./minesweeper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MinesweeperComponent {
  minesweeper = new Minesweeper(8, 8, 10);

  onClick(x: number, y: number) {
    this.minesweeper.open(x, y);
  }

  onRightClick(event: MouseEvent, x: number, y: number) {
    event.preventDefault();
    this.minesweeper.toggleFlag(x, y);
  }
}

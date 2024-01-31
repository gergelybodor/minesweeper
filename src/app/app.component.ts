import { ChangeDetectionStrategy, Component } from '@angular/core';

import { MinesweeperComponent } from './minesweeper/minesweeper.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MinesweeperComponent],
})
export class AppComponent {}

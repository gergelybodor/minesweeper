import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, ViewChild, effect, inject, signal } from '@angular/core';

import { MineCounterComponent } from './mine-counter/mine-counter.component';
import { MinesweeperStore, Params } from './store';
import { TimeCounterComponent } from './time-counter/time-counter.component';

const BEGINNER: Params = { width: 8, height: 8, mineCount: 10 };
const INTERMEDIATE: Params = { width: 16, height: 16, mineCount: 40 };
const EXPERT: Params = { width: 30, height: 16, mineCount: 99 };

@Component({
  selector: 'app-minesweeper',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, TimeCounterComponent, MineCounterComponent],
  templateUrl: './minesweeper.component.html',
  styleUrls: ['./minesweeper.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MinesweeperStore],
})
export class MinesweeperComponent implements OnInit {
  @ViewChild(TimeCounterComponent) timeCounter!: TimeCounterComponent;
  @ViewChild(MineCounterComponent) mineCounter!: MineCounterComponent;

  #lastParams = signal<Params>(BEGINNER);

  #store = inject(MinesweeperStore);

  readonly cells = this.#store.cells;
  readonly mines = this.#store.mines;
  readonly flaggedFields = this.#store.flaggedFields;

  constructor() {
    effect(() => {
      const isLostState = this.#store.isLostState();
      const isWinState = this.#store.isWinState();
      if (isLostState || isWinState) {
        this.timeCounter.stop();
      }
    });
  }

  ngOnInit() {
    this.#store.start(BEGINNER);
  }

  onClick(x: number, y: number) {
    if (this.#store.pristine()) {
      this.#store.start({ ...this.#lastParams(), x, y });
    }
    this.#store.open(x, y);
  }

  onRightClick(event: MouseEvent, x: number, y: number) {
    event.preventDefault();
    this.#store.toggleFlag(x, y);
  }

  startBeginnerGame() {
    this.#store.start(BEGINNER);
    this.timeCounter.reset();
    this.timeCounter.start();
    this.#lastParams.set(BEGINNER);
  }

  startIntermediateGame() {
    this.#store.start(INTERMEDIATE);
    this.timeCounter.reset();
    this.timeCounter.start();
    this.#lastParams.set(INTERMEDIATE);
  }

  startExpertGame() {
    this.#store.start(EXPERT);
    this.timeCounter.reset();
    this.timeCounter.start();
    this.#lastParams.set(EXPERT);
  }
}

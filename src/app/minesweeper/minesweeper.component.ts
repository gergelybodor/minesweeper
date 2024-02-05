import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, ViewChild, effect, inject, signal } from '@angular/core';

import { MineCounterComponent } from './mine-counter/mine-counter.component';
import { ResetButtonComponent } from './reset-button/reset-button.component';
import { CellTypes, MinesweeperStore, Params } from './store';
import { TimeCounterComponent } from './time-counter/time-counter.component';

const BEGINNER: Params = { width: 8, height: 8, mineCount: 10 };
const INTERMEDIATE: Params = { width: 16, height: 16, mineCount: 40 };
const EXPERT: Params = { width: 30, height: 16, mineCount: 99 };

@Component({
  selector: 'app-minesweeper',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, TimeCounterComponent, MineCounterComponent, ResetButtonComponent],
  templateUrl: './minesweeper.component.html',
  styleUrls: ['./minesweeper.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MinesweeperStore],
})
export class MinesweeperComponent implements OnInit {
  @ViewChild(TimeCounterComponent) timeCounter!: TimeCounterComponent;
  @ViewChild(MineCounterComponent) mineCounter!: MineCounterComponent;

  readonly #store = inject(MinesweeperStore);

  readonly openedTick = signal<number>(0);
  readonly #lastParams = signal<Params>(BEGINNER);

  readonly cells = this.#store.cells;
  readonly mines = this.#store.mines;
  readonly flaggedFields = this.#store.flaggedFields;
  readonly isLostState = this.#store.isLostState;
  readonly isWinState = this.#store.isWinState;

  readonly cellTypes = CellTypes;

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

  onClick(event: MouseEvent, x: number, y: number) {
    if (this.isLostState() || this.isWinState()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    if (this.#store.pristine()) {
      this.#store.start({ ...this.#lastParams(), x, y });
      this.timeCounter.start();
    }
    const openResult = this.#store.open(x, y);

    if (openResult) {
      this.openedTick.set(Date.now());
    }
  }

  onRightClick(event: MouseEvent, x: number, y: number) {
    if (this.isLostState() || this.isWinState()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    event.preventDefault();
    this.#store.toggleFlag(x, y);
  }

  startBeginnerGame() {
    this.#store.start(BEGINNER);
    this.timeCounter.reset();
    this.#lastParams.set(BEGINNER);
  }

  startIntermediateGame() {
    this.#store.start(INTERMEDIATE);
    this.timeCounter.reset();
    this.#lastParams.set(INTERMEDIATE);
  }

  startExpertGame() {
    this.#store.start(EXPERT);
    this.timeCounter.reset();
    this.#lastParams.set(EXPERT);
  }

  restart() {
    this.#store.start(this.#lastParams());
    this.timeCounter.reset();
  }
}

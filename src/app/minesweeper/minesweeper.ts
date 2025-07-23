import { NgOptimizedImage } from '@angular/common';
import { Component, OnInit, effect, inject, signal, viewChild } from '@angular/core';

import { MineCounter } from './mine-counter/mine-counter';
import { ResetButton } from './reset-button/reset-button';
import { CellTypes, MinesweeperStore, Params } from './store';
import { TimeCounter } from './time-counter/time-counter';

const BEGINNER: Params = { width: 8, height: 8, mineCount: 10 };
const INTERMEDIATE: Params = { width: 16, height: 16, mineCount: 40 };
const EXPERT: Params = { width: 30, height: 16, mineCount: 99 };

@Component({
  selector: 'app-minesweeper',
  imports: [MineCounter, ResetButton, TimeCounter, NgOptimizedImage],
  templateUrl: './minesweeper.html',
  styleUrl: './minesweeper.css',
  providers: [MinesweeperStore],
})
export class Minesweeper implements OnInit {
  readonly timeCounter = viewChild(TimeCounter);
  readonly mineCounter = viewChild(MineCounter);

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
      const timeCounter = this.timeCounter();
      if (timeCounter && (isLostState || isWinState)) {
        timeCounter.stop();
      }
    });
  }

  ngOnInit() {
    this.#store.start(BEGINNER);
  }

  onClick(event: MouseEvent, x: number, y: number) {
    const timeCounter = this.timeCounter();
    if (!timeCounter) return;

    if (this.isLostState() || this.isWinState()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    if (this.#store.pristine()) {
      this.#store.start({ ...this.#lastParams(), x, y });
      timeCounter.start();
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
    const timeCounter = this.timeCounter();
    if (!timeCounter) return;
    this.#store.start(BEGINNER);

    timeCounter.reset();
    this.#lastParams.set(BEGINNER);
  }

  startIntermediateGame() {
    const timeCounter = this.timeCounter();
    if (!timeCounter) return;

    this.#store.start(INTERMEDIATE);
    timeCounter.reset();
    this.#lastParams.set(INTERMEDIATE);
  }

  startExpertGame() {
    const timeCounter = this.timeCounter();
    if (!timeCounter) return;

    this.#store.start(EXPERT);
    timeCounter.reset();
    this.#lastParams.set(EXPERT);
  }

  restart() {
    const timeCounter = this.timeCounter();
    if (!timeCounter) return;

    this.#store.start(this.#lastParams());
    timeCounter.reset();
  }
}

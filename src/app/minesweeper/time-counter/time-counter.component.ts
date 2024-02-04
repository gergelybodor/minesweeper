import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, computed, signal } from '@angular/core';

@Component({
  selector: 'app-time-counter',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './time-counter.component.html',
  styleUrl: './time-counter.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimeCounterComponent implements OnDestroy {
  time = signal<number>(0);
  digits = computed<string[]>(() => {
    const time = this.time();
    return time.toString().padStart(3, '0').split('');
  });

  #interval: number | undefined;

  ngOnDestroy() {
    this.stop();
  }

  start() {
    this.#interval = setInterval(() => {
      this.time.update((t) => (t + 1 < 1000 ? t + 1 : 999));
    }, 1000);
  }

  stop() {
    clearInterval(this.#interval);
  }

  reset() {
    this.stop();
    this.time.set(0);
  }
}

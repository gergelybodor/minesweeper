import { NgOptimizedImage } from '@angular/common';
import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-mine-counter',
  imports: [NgOptimizedImage],
  templateUrl: './mine-counter.html',
  styleUrl: './mine-counter.css',
})
export class MineCounter {
  mines = input.required<number>();

  mineCountDigits = computed<string[]>(() => {
    const mineCount = this.mines();
    return mineCount.toString().padStart(3, '0').split('');
  });
}

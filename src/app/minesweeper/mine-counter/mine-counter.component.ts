import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-mine-counter',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './mine-counter.component.html',
  styleUrl: './mine-counter.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MineCounterComponent {
  mines = input.required<number>();

  mineCountDigits = computed<string[]>(() => {
    const mineCount = this.mines();
    return mineCount.toString().padStart(3, '0').split('');
  });
}

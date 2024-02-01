import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges, computed, signal } from '@angular/core';

@Component({
  selector: 'app-mine-counter',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './mine-counter.component.html',
  styleUrl: './mine-counter.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MineCounterComponent implements OnChanges {
  @Input({ required: true }) mines!: number;

  mineCount = signal(0);
  mineCountDigits = computed<string[]>(() => {
    const mineCount = this.mineCount();
    return mineCount.toString().padStart(3, '0').split('');
  });

  ngOnChanges(changes: SimpleChanges) {
    if (changes['mines']) this.mineCount.set(this.mines);
  }
}

import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output, effect, input, signal } from '@angular/core';

@Component({
  selector: 'app-reset-button',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './reset-button.component.html',
  styleUrl: './reset-button.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetButtonComponent {
  tick = input<number>(0);
  isWinState = input(false);
  isLostState = input(false);

  @Output() clicked = new EventEmitter<void>();

  isPressed = signal(false);
  isActive = signal(false);

  constructor() {
    effect(
      () => {
        this.tick();

        this.isActive.set(true);

        setTimeout(() => {
          this.isActive.set(false);
        }, 200);
      },
      { allowSignalWrites: true },
    );
  }

  onClick() {
    this.clicked.emit();
  }

  onMouseDown() {
    this.isPressed.set(true);
  }

  onMouseUp() {
    this.isPressed.set(false);
  }
}

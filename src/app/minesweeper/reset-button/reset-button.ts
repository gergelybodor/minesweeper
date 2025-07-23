import { NgOptimizedImage } from '@angular/common';
import { Component, effect, input, output, signal } from '@angular/core';

@Component({
  selector: 'app-reset-button',
  imports: [NgOptimizedImage],
  templateUrl: './reset-button.html',
  styleUrl: './reset-button.css',
})
export class ResetButton {
  tick = input<number>(0);
  isWinState = input(false);
  isLostState = input(false);

  clicked = output<void>();

  isPressed = signal(false);
  isActive = signal(false);

  constructor() {
    effect(() => {
      this.tick();

      this.isActive.set(true);

      setTimeout(() => {
        this.isActive.set(false);
      }, 200);
    });
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

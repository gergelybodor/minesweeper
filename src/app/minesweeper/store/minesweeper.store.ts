import { Injectable, computed, signal } from '@angular/core';

import { Cell, OpenResult, Params, Position, Positions, RequiredParams, State } from './minesweeper.types';

@Injectable()
export class MinesweeperStore {
  state = signal<State>({
    width: 0,
    height: 0,
    pristine: true,
    mines: new Positions(),
    flaggedFields: new Positions(),
    openFields: new Positions(),
    lost: false,
  });
  pristine = computed<boolean>(() => {
    const { pristine } = this.state();
    return pristine;
  });
  mines = computed<Positions>(() => {
    const { mines } = this.state();
    return mines;
  });
  flaggedFields = computed<Positions>(() => {
    const { flaggedFields } = this.state();
    return flaggedFields;
  });

  start({ width, height, mineCount, x, y }: Params) {
    let mines: Positions;
    if (x !== undefined && y !== undefined) {
      mines = this.generateMinesWithSafeNeighbors({ mineCount, width, height, x, y });
    } else {
      mines = this.generateMines({ mineCount, width, height });
    }

    this.state.set({
      width,
      height,
      mines,
      pristine: true,
      flaggedFields: new Positions(),
      openFields: new Positions(),
      lost: false,
    });
  }

  open(x: number, y: number): OpenResult | undefined {
    const pos = new Position(x, y);
    const { width, height, flaggedFields, openFields, mines, lost } = this.state();
    if (this.state().openFields.has(pos)) {
      const mineCount = this.neighbouringMines(pos, width, height, mines);
      const flagCount = this.iterNeighbours(pos, width, height).filter((neighbour) =>
        flaggedFields.has(neighbour),
      ).length;

      if (mineCount === flagCount) {
        for (const neighbour of this.iterNeighbours(pos, width, height)) {
          if (!flaggedFields.has(neighbour) && !openFields.has(neighbour)) {
            this.open(neighbour.x, neighbour.y);
          }
        }
      }

      return undefined;
    }

    if (lost || flaggedFields.has(pos)) {
      return undefined;
    }

    openFields.add(pos);
    this.state.update((state) => ({ ...state, pristine: false }));

    const isMine = mines.has(pos);

    if (isMine) {
      this.state.update((state) => ({ ...state, lost: true }));
      return { mine: true };
    } else {
      const mineCount = this.neighbouringMines(pos, width, height, mines);

      if (mineCount === 0) {
        for (const neighbour of this.iterNeighbours(pos, width, height)) {
          if (!openFields.has(neighbour)) {
            this.open(neighbour.x, neighbour.y);
          }
        }
      }

      return { mine: false, mineCount };
    }
  }

  toggleFlag(x: number, y: number) {
    const pos = new Position(x, y);
    const { lost, openFields, flaggedFields } = this.state();
    if (lost || openFields.has(pos)) {
      return;
    }
    if (flaggedFields.has(pos)) {
      flaggedFields.delete(pos);
    } else {
      flaggedFields.add(pos);
    }
    this.state.update((state) => ({ ...state, flaggedFields }));
  }

  isWinState = computed<boolean>(() => {
    const { width, height, mines, openFields, lost } = this.state();
    return width * height - mines.size === openFields.size && !lost;
  });

  isLostState = computed<boolean>(() => {
    const { lost } = this.state();
    return lost;
  });

  cells = computed<Cell[][]>(() => {
    const { width, height, openFields, flaggedFields, mines, lost } = this.state();
    const a = Array.from({ length: height }).map((_, y) => {
      return Array.from({ length: width }).map((_, x) => {
        const pos = new Position(x, y);

        if (!openFields.has(pos)) {
          if (lost && mines.has(pos)) {
            return { x, y, mine: true };
          } else if (flaggedFields.has(pos)) {
            return { x, y, flagged: true };
          } else {
            return { x, y };
          }
        } else if (mines.has(pos)) {
          return { x, y, mine: true };
        } else {
          const mineCount = this.neighbouringMines(pos, width, height, mines);

          if (mineCount > 0) {
            return { x, y, mineCount };
          } else {
            return { x, y, blank: true };
          }
        }
      });
    });
    return a;
  });

  private generateMines({ mineCount, width, height }: Params): Positions {
    const mines = new Positions();
    Array.from({ length: mineCount }).forEach(() => {
      let [x, y] = this.generateRandomCoordinates(width, height);
      while (mines.has(new Position(x, y))) {
        [x, y] = this.generateRandomCoordinates(width, height);
      }
      mines.add(new Position(x, y));
    });
    return mines;
  }

  private generateMinesWithSafeNeighbors({ mineCount, width, height, x, y }: RequiredParams): Positions {
    const mines = new Positions();
    const safeOrigin = new Position(x, y);
    const safeNeighbors = this.iterNeighbours(safeOrigin, width, height);
    const safePositions: Positions = new Positions();
    safePositions.add(safeOrigin);
    safeNeighbors.forEach((pos) => safePositions.add(pos));

    Array.from({ length: mineCount }).forEach(() => {
      let [x, y] = this.generateRandomCoordinates(width, height);
      while (mines.has(new Position(x, y)) || safePositions.has(new Position(x, y))) {
        [x, y] = this.generateRandomCoordinates(width, height);
      }
      mines.add(new Position(x, y));
    });
    return mines;
  }

  private generateRandomCoordinates(width: number, height: number): [number, number] {
    const x = Math.floor(Math.random() * width);
    const y = Math.floor(Math.random() * height);
    return [x, y];
  }

  private iterNeighbours({ x, y }: Position, width: number, height: number): Position[] {
    const xRange = x > 0 ? x - 1 : x;
    const yRange = y > 0 ? y - 1 : y;

    const neighbours: Position[] = [];

    for (let i = xRange; i <= x + 1 && i < width; i++) {
      for (let j = yRange; j <= y + 1 && j < height; j++) {
        if (i !== x || j !== y) {
          neighbours.push(new Position(i, j));
        }
      }
    }

    return neighbours;
  }

  private neighbouringMines(pos: Position, width: number, height: number, mines: Positions): number {
    return this.iterNeighbours(pos, width, height).filter((neighbour) => mines.has(neighbour)).length;
  }
}

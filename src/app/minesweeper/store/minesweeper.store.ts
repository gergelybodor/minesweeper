import { Injectable, computed, signal } from '@angular/core';

import { Cell, CellTypes, Params, Position, Positions, RequiredParams, State } from './minesweeper.types';

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

  open(x: number, y: number) {
    const { width, height, flaggedFields, openFields, mines, lost } = this.state();
    const pos = new Position(x, y);

    // if the game is lost or the field is flagged
    if (lost || flaggedFields.has(pos)) {
      // noop
      return;
    }

    // if the field is already open
    else if (openFields.has(pos)) {
      // handle open propagation/bubbling
      return this.handleOpenPropagation(pos, width, height, mines, openFields, flaggedFields);
    }

    // if the field is not yet open
    else {
      openFields.add(pos);

      // update state
      this.state.update((state) => ({ ...state, openFields, pristine: false, lastClicked: pos }));

      const isMine = mines.has(pos);

      if (isMine) {
        this.state.update((state) => ({ ...state, lost: true }));
      } else {
        const mineCount = this.neighbouringMines(pos, width, height, mines);

        if (mineCount === 0) {
          for (const neighbour of this.iterNeighbours(pos, width, height)) {
            if (!openFields.has(neighbour)) {
              this.open(neighbour.x, neighbour.y);
            }
          }
        }
      }

      return true;
    }
  }

  private handleOpenPropagation(
    pos: Position,
    width: number,
    height: number,
    mines: Positions,
    openFields: Positions,
    flaggedFields: Positions,
  ) {
    // get the number of mines around the field
    const mineCount = this.neighbouringMines(pos, width, height, mines);
    // get the number of flags around the field
    const flagCount = this.iterNeighbours(pos, width, height).filter((neighbour) =>
      flaggedFields.has(neighbour),
    ).length;

    // if the number of flags around the field is equal to the number of mines around the field
    if (mineCount === flagCount) {
      // loop through the neighbours
      for (const neighbour of this.iterNeighbours(pos, width, height)) {
        // if the neighbour is not flagged and not open
        if (!flaggedFields.has(neighbour) && !openFields.has(neighbour)) {
          // open the neighbour, which will recursively open all the neighbours of the neighbour
          this.open(neighbour.x, neighbour.y);
        }
      }

      return true;
    }

    return;
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
    const { width, height, openFields, flaggedFields, mines, lost, lastClicked } = this.state();

    return Array.from({ length: height }).map((_, y) => {
      return Array.from({ length: width }).map((_, x) => {
        const pos = new Position(x, y);
        const mineCount = this.neighbouringMines(pos, width, height, mines);

        const cell: Cell = { x, y, mines: mineCount, type: CellTypes.blank };

        if (openFields.has(pos) && !mines.has(pos)) {
          if (mineCount > 0) {
            cell.type = CellTypes.count;
          } else {
            cell.type = CellTypes.blankPressed;
          }
        }

        if (lost) {
          if (flaggedFields.has(pos) && mines.has(pos)) {
            cell.type = CellTypes.flag;
          } else if (flaggedFields.has(pos) && !mines.has(pos)) {
            cell.type = CellTypes.x;
          } else if (mines.has(pos) && lastClicked?.equals(pos)) {
            cell.type = CellTypes.mineRed;
          } else if (mines.has(pos)) {
            cell.type = CellTypes.mine;
          }
        } else {
          if (flaggedFields.has(pos)) {
            cell.type = CellTypes.flag;
          }
        }
        return cell;
      });
    });
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

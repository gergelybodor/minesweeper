// type Position = [number, number];

type OpenResult = { mine: boolean; mineCount?: number };

type Cell = { x: number; y: number; mine?: boolean; mineCount?: number; flagged?: boolean; blank?: boolean };

export class Position {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  toString(): string {
    return `${this.x},${this.y}`;
  }
}

export class Positions extends Set<Position> {
  constructor() {
    super();
  }

  override has(value: Position): boolean {
    return Array.from(super.values())
      .map((pos) => pos.toString())
      .includes(value.toString());
  }

  override delete(value: Position): boolean {
    const pos = Array.from(super.values()).find((pos) => pos.toString() === value.toString());
    if (pos) {
      return super.delete(pos);
    }
    return false;
  }
}

export class Minesweeper {
  readonly width: number;
  readonly height: number;
  mines: Positions;
  flaggedFields: Positions;
  openFields: Positions;
  lost: boolean;

  constructor(width: number, height: number, mineCount: number) {
    this.width = width;
    this.height = height;
    this.flaggedFields = new Positions();
    this.openFields = new Positions();
    this.lost = false;

    this.mines = new Positions();
    Array.from({ length: mineCount }).forEach(() => {
      const x = Math.floor(Math.random() * width);
      const y = Math.floor(Math.random() * height);
      this.mines.add(new Position(x, y));
    });
  }

  iterNeighbours({ x, y }: Position): Position[] {
    const xRange = x > 0 ? x - 1 : x;
    const yRange = y > 0 ? y - 1 : y;

    const neighbours: Position[] = [];

    for (let i = xRange; i <= x + 1 && i < this.width; i++) {
      for (let j = yRange; j <= y + 1 && j < this.height; j++) {
        if (i !== x || j !== y) {
          neighbours.push(new Position(i, j));
        }
      }
    }

    return neighbours;
  }

  neighbouringMines(pos: Position): number {
    return this.iterNeighbours(pos).filter((neighbour) => this.mines.has(neighbour)).length;
  }

  open(x: number, y: number): OpenResult | undefined {
    const pos = new Position(x, y);
    if (this.openFields.has(pos)) {
      const mineCount = this.neighbouringMines(pos);
      const flagCount = this.iterNeighbours(pos).filter((neighbour) => this.flaggedFields.has(neighbour)).length;

      if (mineCount === flagCount) {
        for (const neighbour of this.iterNeighbours(pos)) {
          if (!this.flaggedFields.has(neighbour) && !this.openFields.has(neighbour)) {
            this.open(neighbour.x, neighbour.y);
          }
        }
      }

      return undefined;
    }

    if (this.lost || this.flaggedFields.has(pos)) {
      return undefined;
    }

    this.openFields.add(pos);

    const isMine = this.mines.has(pos);

    if (isMine) {
      this.lost = true;
      return { mine: true };
    } else {
      const mineCount = this.neighbouringMines(pos);

      if (mineCount === 0) {
        for (const neighbour of this.iterNeighbours(pos)) {
          if (!this.openFields.has(neighbour)) {
            this.open(neighbour.x, neighbour.y);
          }
        }
      }

      return { mine: false, mineCount };
    }
  }

  toggleFlag(x: number, y: number) {
    const pos = new Position(x, y);
    if (this.lost || this.openFields.has(pos)) {
      return;
    }
    if (this.flaggedFields.has(pos)) {
      this.flaggedFields.delete(pos);
    } else {
      this.flaggedFields.add(pos);
    }
  }

  get cells(): Cell[][] {
    const a = Array.from({ length: this.height }).map((_, y) => {
      return Array.from({ length: this.width }).map((_, x) => {
        const pos = new Position(x, y);

        if (!this.openFields.has(pos)) {
          if (this.lost && this.mines.has(pos)) {
            return { x, y, mine: true };
          } else if (this.flaggedFields.has(pos)) {
            return { x, y, flagged: true };
          } else {
            return { x, y };
          }
        } else if (this.mines.has(pos)) {
          return { x, y, mine: true };
        } else {
          const mineCount = this.neighbouringMines(pos);

          if (mineCount > 0) {
            return { x, y, mineCount };
          } else {
            return { x, y, blank: true };
          }
        }
      });
    });
    return a;
  }
}

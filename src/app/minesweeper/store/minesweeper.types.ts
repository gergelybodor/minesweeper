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

  equals(other: Position): boolean {
    return this.x === other.x && this.y === other.y;
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

export interface State {
  width: number;
  height: number;
  pristine: boolean;
  mines: Positions;
  flaggedFields: Positions;
  openFields: Positions;
  lost: boolean;
  lastClicked?: Position;
}

export interface Params {
  width: number;
  height: number;
  mineCount: number;
  x?: number;
  y?: number;
}

export type RequiredParams = Required<Params>;

export const CellTypes = {
  blank: 'blank',
  blankPressed: 'blankPressed',
  flag: 'flag',
  mine: 'mine',
  mineRed: 'mineRed',
  question: 'question',
  questionPressed: 'questionPressed',
  x: 'x',
  count: 'count',
} as const;

export type CellType = (typeof CellTypes)[keyof typeof CellTypes];

export interface Cell {
  x: number;
  y: number;
  mines: number;
  type: CellType;
}

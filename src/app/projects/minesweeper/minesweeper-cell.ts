interface IMinesweeperCell {
    i: number;
    j: number;
    neighborCount: number;
    mine: boolean;
    revealed: boolean;
}

export class MinesweeperCell implements IMinesweeperCell {
    i: number;
    j: number;
    neighborCount: number;
    mine: boolean;
    revealed: boolean;

    constructor(i: number, j: number) {
        this.i = i;
        this.j = j;
        this.neighborCount = 0;
        this.mine = false;
        this.revealed = false;
    }
}

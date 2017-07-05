import { Component, OnInit } from '@angular/core';
import { MinesweeperCell } from './minesweeper-cell';

@Component({
    selector: 'app-minesweeper',
    templateUrl: './minesweeper.component.html',
    styleUrls: ['./minesweeper.component.scss']
})
export class MinesweeperComponent implements OnInit {

    private grid: MinesweeperCell[][];
    private cols = 16;
    private rows = 16;
    private totalMines = 40;
    private options = [];

    constructor() {
    }

    ngOnInit(): void {
        this.initMinesweeper();
    }

    public onCellClick(i: number, j: number): void {
        this.reveal(this.grid[i][j]);
        if (this.grid[i][j].mine) {
            this.revealAll();
        }
    }

    private initMinesweeper(): void {
        this.initGrid();
        this.pickRandomMines();
        this.initCountMines();
    }

    private initGrid(): void {
        this.grid = this.create2DArray(this.cols, this.rows);
        for (let i = 0; i < this.cols; i++) {
            for (let j = 0; j < this.rows; j++) {
                this.grid[i][j] = new MinesweeperCell(i, j);
            }
        }
    }

    private pickRandomMines(): void {
        for (let i = 0; i < this.cols; i++) {
            for (let j = 0; j < this.rows; j++) {
                this.options.push([i, j]);
            }
        }
        for (let n = 0; n < this.totalMines; n++) {
            const index = Math.floor(Math.random() * this.options.length);
            const choice = this.options[index];
            const i = choice[0];
            const j = choice[1];
            this.options.splice(index, 1);
            this.grid[i][j].mine = true;
        }
    }

    private create2DArray(cols: number, rows: number): any[][] {
        const x = new Array(cols);
        for (let i = 0; i < cols; i++) {
            x[i] = new Array(rows);
        }
        return x;
    }

    private initCountMines(): void {
        for (let i = 0; i < this.cols; i++) {
            for (let j = 0; j < this.rows; j++) {
                this.countMines(this.grid[i][j]);
            }
        }
    }

    private countMines(cell: MinesweeperCell): void {
        if (cell.mine) {
            cell.neighborCount = -1;
            return;
        }
        let total = 0;
        for (let xoff = -1; xoff <= 1; xoff++) {
            const i = cell.i + xoff;
            if (i < 0 || i >= this.cols) {
                continue;
            }
            for (let yoff = -1; yoff <= 1; yoff++) {
                const j = cell.j + yoff;
                if (j < 0 || j >= this.rows) {
                    continue;
                }
                const neighbor = this.grid[i][j];
                if (neighbor.mine) {
                    total++;
                }
            }
        }
        cell.neighborCount = total;
    }

    private revealAll(): void {
        for (let i = 0; i < this.cols; i++) {
            for (let j = 0; j < this.rows; j++) {
                this.grid[i][j].revealed = true;
            }
        }

    }

    private reveal(cell: MinesweeperCell): void {
        cell.revealed = true;
        if (cell.neighborCount === 0) {
            this.floodFill(cell);
        }
    }

    private floodFill(cell: MinesweeperCell): void {
        for (let xoff = -1; xoff <= 1; xoff++) {
            const i = cell.i + xoff;
            if (i < 0 || i >= this.cols) {
                continue;
            }
            for (let yoff = -1; yoff <= 1; yoff++) {
                const j = cell.j + yoff;
                if (j < 0 || j >= this.rows) {
                    continue;
                }
                const neighbor = this.grid[i][j];
                if (!neighbor.mine && !neighbor.revealed) {
                    this.reveal(neighbor);
                }
            }
        }
    }
}

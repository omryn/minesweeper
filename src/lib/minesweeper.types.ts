import { isNumber } from "lodash";

export const MINE = -1;
export enum GAME_STATUS {
    WON, LOST, PLAYING
}

export interface Point {
  x: number;
  y: number;
}

export function  isPoint(x:any): x is Point {
    return isNumber(x?.x) && isNumber(x?.y);
}

export type Cell = Point|CellState;

export interface GameBoard {
  width: number;
  height: number;
  cells: Array<Array<CellState>>;
  status: GAME_STATUS
}

export interface CellState {
  status: CELL_STATUS;
  value: number;
}

export enum CELL_STATUS {
    HIDDEN, VISIBLE, USER_MINE, USER_UNKNOWN
}
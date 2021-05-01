import { identity, times } from "lodash";
import {
  getCellLocation,
  getNeighbors,
  swapCells,
  withMines,
  emptyBoard,
  withStatus,
} from "./helpers";
import {
  GameBoard,
  Cell,
  CellState,
  Point,
  CELL_STATUS,
} from "./minesweeper.types";

export function reveal(board: GameBoard, cell: Cell): GameBoard {
  const { x, y } = getCellLocation(board, cell);
  const origin = board.cells[x][y];
  const madeVisible = new Map<CellState, CellState>();
  if (origin?.status === CELL_STATUS.HIDDEN) {
    const traverse = (cell: CellState) => {
      if (cell.status === CELL_STATUS.HIDDEN && !madeVisible.has(cell)) {
        madeVisible.set(cell, withStatus(cell, CELL_STATUS.VISIBLE));
        if (cell.value === 0) {
          getNeighbors(board, cell).forEach(traverse);
        }
      }
    };
    traverse(origin);
  }
  return swapCells(board, (cell) => madeVisible.get(cell) || cell);
}

export const newGame = (
  width: number,
  height: number,
  mineProbability: number
) =>
  withMines(
    emptyBoard(width, height),
    times(width * height)
      .map((_, i) =>
        Math.random() < mineProbability
          ? { x: i % width, y: (i / width) | 0 }
          : undefined
      )
      .filter(identity) as Point[]
  );

const NEXT = {
  [CELL_STATUS.HIDDEN]: CELL_STATUS.USER_MINE,
  [CELL_STATUS.USER_MINE]: CELL_STATUS.USER_UNKNOWN,
  [CELL_STATUS.USER_UNKNOWN]: CELL_STATUS.HIDDEN,
  [CELL_STATUS.VISIBLE]: CELL_STATUS.VISIBLE,
};

export const nextStatus = (board: GameBoard, target: CellState) =>
  swapCells(board, (cell) =>
    cell === target ? withStatus(cell, NEXT[target.status]) : cell
  );

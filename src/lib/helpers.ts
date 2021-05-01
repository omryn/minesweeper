import {
  Cell,
  CellState,
  CELL_STATUS,
  GameBoard,
  GAME_STATUS,
  isPoint,
  MINE,
  Point,
} from "lib/minesweeper.types";
import { identity, times } from "lodash";

export const emptyCell: () => CellState = () => ({
  status: CELL_STATUS.HIDDEN,
  value: 0,
});

export function emptyBoard(
  width: number,
  height: number,
  debug = false
): GameBoard {
  return {
    width,
    height,
    status: GAME_STATUS.PLAYING,
    cells: times(width).map((_, x) =>
      times(height).map((__, y) => emptyCell())
    ),
  };
}

export const withMines = (board: GameBoard, mines: Point[]) =>
  mines.reduce((b, mine) => addMine(b, mine), board);

export function getCellLocation(board: GameBoard, cell: Cell): Point {
  if (isPoint(cell)) {
    return cell;
  }
  for (let x = 0; x < board.cells.length; x++) {
    for (let y = 0; y < board.cells[x].length; y++) {
      if (cell === board.cells[x][y]) {
        return { x, y };
      }
    }
  }
  throw new Error(`Cell is not on the board`);
}

export const getNeighbors = (board: GameBoard, cell: Cell) => {
  const { x, y } = getCellLocation(board, cell);
  return [board.cells[x - 1], board.cells[x], board.cells[x + 1]]
    .flatMap(
      (column, dx) =>
        column &&
        (dx === 1
          ? [column[y - 1], column[y + 1]]
          : [column[y - 1], column[y], column[y + 1]])
    )
    .filter(identity);
};

const addMine = (board: GameBoard, cell: Cell) => {
  const { x, y } = getCellLocation(board, cell);
  const origin = board.cells[x][y];

  if (origin.value === MINE) {
    throw new Error(`Cell at {${x},${y}} is already a mine`);
  }
  const neighbors = getNeighbors(board, cell);
  return swapCells(board, (target) => {
    if (target === origin) {
      return { ...target, value: MINE };
    }
    if (neighbors.includes(target) && target.value !== MINE) {
      return { ...target, value: target.value + 1 };
    }
    return target;
  });
};

export function swapCells(
  board: GameBoard,
  modifier: (cell: CellState, location: Point) => CellState
): GameBoard {
  const cells = board.cells.map((column, x) =>
    column.map((cell, y) => modifier(cell, { x, y }))
  );
  return {
    ...board,
    cells,
    status: getStatus(cells),
  };
}

export const withStatus = (cell: CellState, status:CELL_STATUS) =>
  ({ ...cell, status } as CellState);

export function getStatus(cells: CellState[][]) {
  const allCells = cells.flatMap((i) => i);
  if (
    allCells.some(
      ({ status, value }) => status === CELL_STATUS.VISIBLE && value === MINE
    )
  ) {
    return GAME_STATUS.LOST;
  }
  if (allCells.some(({ status }) => status === CELL_STATUS.USER_UNKNOWN)) {
    return GAME_STATUS.PLAYING;
  }
  if (
    allCells.every(
      ({ status, value }) =>
        status === CELL_STATUS.VISIBLE ||
        value === MINE ||
        (value === MINE && status === CELL_STATUS.USER_MINE)
    )
  ) {
    return GAME_STATUS.WON;
  }
  return GAME_STATUS.PLAYING;
}

import { CELL_STATUS, GameBoard, MINE } from "lib/minesweeper.types";
import { identity } from "lodash";

export const valuesString = (board: GameBoard, showHidden: boolean) =>
  transpose(board.cells)
    .map((column) =>
      column
        .map(({ value, status }) =>
          !showHidden && status === CELL_STATUS.HIDDEN ? "#" : value === MINE ? "*" : "" + value
        )
        .join("")
    )
    .join("\n");

export const transpose = <T>(matrix: Array<Array<T>>) => {
  const res: Array<Array<T>> = matrix[0].map((_) => []);
  matrix.forEach((column, x) => column.forEach((v, y) => (res[y][x] = v)));
  return res;
};

export const dropSpaces = (s: string) =>
  s.split(/\s+/m).filter(identity).join("\n");

export const addMatchers = () => {
  expect.extend({
    toHaveValues(board: GameBoard, expectedString: string, showHidden = false) {
      const expected = dropSpaces(expectedString);
      const boardStr = valuesString(board, showHidden);
      const pass = boardStr === expected;
      return {
        pass,
        message: () => this.utils.matcherHint("toEqual", boardStr, expected),
      };
    },
  });
};

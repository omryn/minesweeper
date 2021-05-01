import {
  CELL_STATUS,
  GameBoard,
  GAME_STATUS,
  MINE,
} from "lib/minesweeper.types";
import {
  emptyBoard as newBoard,
  getNeighbors,
  swapCells,
  withMines,
} from "lib/helpers";
import { addMatchers } from "./test.helpers";

addMatchers();

describe("helpers", () => {
  const emptyBoard: GameBoard = newBoard(4, 3);
  const boardWithMines = withMines(emptyBoard, [
    { x: 0, y: 0 },
    { x: 1, y: 1 },
  ]);

  describe("getNeighbors", () => {
    it("returns an array of adjacent cells", () => {
      const neighbors = getNeighbors(emptyBoard, { x: 1, y: 1 });
      expect(neighbors).toHaveLength(8);
      expect(neighbors).toContain(emptyBoard.cells[0][0]);
      expect(neighbors).toContain(emptyBoard.cells[0][1]);
      expect(neighbors).toContain(emptyBoard.cells[0][2]);
      expect(neighbors).toContain(emptyBoard.cells[1][0]);
      expect(neighbors).toContain(emptyBoard.cells[1][2]);
      expect(neighbors).toContain(emptyBoard.cells[2][0]);
      expect(neighbors).toContain(emptyBoard.cells[2][1]);
      expect(neighbors).toContain(emptyBoard.cells[2][2]);
      expect(neighbors).not.toContain(emptyBoard.cells[1][1]);
    });
    it("does not return out of bounds neighbors", () => {
      const neighbors = getNeighbors(emptyBoard, { x: 1, y: 0 });
      expect(neighbors).toHaveLength(5);
      expect(neighbors).not.toContain(undefined);
    });
  });

  describe("withMines", () => {
    it(`throws when there's already a mine in that cell`, () => {
      const boardWithMine = swapCells(emptyBoard, (cell, { x, y }) =>
        x === 0 && y === 1 ? { ...cell, value: MINE } : cell
      );
      expect(() => withMines(boardWithMine, [{ x: 0, y: 1 }])).toThrow(
        "Cell at {0,1} is already a mine"
      );
      expect(() => withMines(boardWithMine, [{ x: 1, y: 1 }])).not.toThrow();
    });
    it(`sets the cell value to MINE`, () => {
      const boardWithMine = withMines(emptyBoard, [{ x: 0, y: 0 }]);
      expect(boardWithMine.cells[0][0]).toEqual({
        value: MINE,
        status: CELL_STATUS.HIDDEN,
      });
    });
    it(`updated the neighboring cells value`, () => {
      expect(boardWithMines).toHaveValues(
        `*210
        2*10
        1110`,
        true
      );
      expect(boardWithMines.cells[1][1]).toEqual({
        value: MINE,
        status: CELL_STATUS.HIDDEN,
      });
      expect(boardWithMines.cells[0][1].value).toEqual(2);
      expect(boardWithMines.cells[1][0].value).toEqual(2);
      expect(boardWithMines.cells[2][2].value).toEqual(1);
      expect(boardWithMines.cells[3][2].value).toEqual(0);
    });
  });
});

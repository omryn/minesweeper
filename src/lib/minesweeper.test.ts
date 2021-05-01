import { CELL_STATUS, GameBoard, GAME_STATUS, MINE } from "lib/minesweeper.types";
import {
  emptyBoard as newBoard,
  withMines,
} from "lib/helpers";
import { reveal } from 'lib/minesweeper';
import { addMatchers } from "./test.helpers";
addMatchers();

describe("minesweeper", () => {
  const emptyBoard: GameBoard = newBoard(4, 3);
  const boardWithMines = withMines(emptyBoard, [
    { x: 0, y: 0 },
    { x: 1, y: 1 },
  ]);

  describe("reveal", () => {
    it(`changes the target cell isHidden to false`, () => {
      expect(reveal(emptyBoard, { x: 0, y: 0 }).cells[0][0]).toEqual({
        value: 0,
        status: CELL_STATUS.VISIBLE,
      });

      expect(reveal(boardWithMines, { x: 0, y: 0 }).cells[0][0]).toEqual({
        value: MINE,
        status: CELL_STATUS.VISIBLE,
      });
    });
    it(`reveals the area next to the cell up to (including) non-zero values`, () => {
      expect(reveal(boardWithMines, { x: 3, y: 2 })).toHaveValues(`
        ##10
        ##10
        ##10`);
      expect(reveal(boardWithMines, { x: 1, y: 1 })).toHaveValues(`
        ####
        #*##
        ####`);
      expect(reveal(boardWithMines, { x: 0, y: 1 })).toHaveValues(`
        ####
        2###
        ####`);
      expect(reveal(boardWithMines, { x: 2, y: 1 })).toHaveValues(`
        ####
        ##1#
        ####`);
    });
    it(`updates the game status`, () => {
        expect(reveal(emptyBoard, {x:1, y:1}).status).toEqual(GAME_STATUS.WON);
        expect(reveal(boardWithMines, {x:1,y:1}).status).toEqual(GAME_STATUS.LOST);
        expect(reveal(boardWithMines, {x:1,y:0}).status).toEqual(GAME_STATUS.PLAYING);
    });
  });
});
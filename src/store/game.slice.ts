import * as model from "lib/minesweeper";
import { Cell, CellState, GameBoard } from "lib/minesweeper.types";
import { initialState as initialBoardState } from "./board.slice";
import { createSlice, original, PayloadAction } from "@reduxjs/toolkit";

const { width, height, minesProbability } = initialBoardState;
const initialState = model.newGame(width, height, minesProbability);

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    reveal: (state, { payload: cell }: PayloadAction<Cell>) => {
      if (cell) {
        // strip immer wraper from the state
        const s = original(state)!;
        return model.reveal(s, cell);
      }
    },
    nextStatus: (state, { payload: cell }: PayloadAction<CellState>) => {
      // strip immer wraper from the state
      const s = original(state)!;
      return model.nextStatus(s, cell);
    },
    newGame: (_, { payload: { width, height, minesProbability } }: PayloadAction<typeof initialBoardState>) => {
      return model.newGame(width, height, minesProbability/100);
    },
    setBoard: (_, { payload: board }: PayloadAction<GameBoard>) => {
      return board;
    },
  },
});

export default gameSlice.reducer;

import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import gameReducer from "./game.slice";
import boardReducer from "./board.slice";
import timerReducer from "./timer.slice";

export const store = configureStore({
  reducer: {
    game: gameReducer,
    board: boardReducer,
    timer: timerReducer
  },
});

export * from "./game.slice";
export * from "./board.slice";
export * from "./timer.slice";

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

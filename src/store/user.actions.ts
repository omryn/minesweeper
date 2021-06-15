import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { AppThunk } from "./store";
import { GameBoard, GAME_STATUS } from "lib/minesweeper.types";
import { gameSlice } from "./game.slice";
import { timerSlice } from "./timer.slice";
import { boardSlice } from "./board.slice";

const newGame =
  (board: { width: number; height: number; minesProbability: number }): AppThunk =>
  (dispatch) => {
    dispatch(gameSlice.actions.newGame(board));
    dispatch(timerSlice.actions.resetTimer());
  };

const setValueAndNewGame =
  (action: ActionCreatorWithPayload<any, string>): ((v: number) => AppThunk) =>
  (value: number) =>
  (dispatch, getState) => {
    dispatch(action(value));
    dispatch(newGame(getState().board));
  };

const click =
  <T>(action: ActionCreatorWithPayload<T>) =>
  (cell: T): AppThunk =>
  (dispatch, getState) => {
    dispatch(action(cell));
    const {
      game: { status },
      timer: { active },
    } = getState();
    if (status === GAME_STATUS.PLAYING) {
      if (!active) {
        dispatch(timerSlice.actions.setTimerActive(true));
      }
    } else {
      dispatch(timerSlice.actions.setTimerActive(false));
    }
  };

export const userActions = {
  leftClick: click(gameSlice.actions.reveal),

  rightClick: click(gameSlice.actions.nextStatus),

  reset: (): AppThunk => (dispatch, getStore) => {
    dispatch(gameSlice.actions.newGame(getStore().board));
  },
  setWidth: setValueAndNewGame(boardSlice.actions.setBoardWidth),
  setHeight: setValueAndNewGame(boardSlice.actions.setBoardHeight),
  setMines: setValueAndNewGame(boardSlice.actions.setBoardMinesProbability),
};

export const systemActions = {
  newBoard:
    (board: GameBoard): AppThunk =>
    (dispatch) => {
      dispatch(timerSlice.actions.resetTimer());
      dispatch(gameSlice.actions.setBoard(board));
    },
};

import { Cell } from "components/Cell";
import "./Board.scss";
import { useEffect, useState } from "react";
import { newGame, nextStatus, reveal } from "lib/minesweeper";
import { GameBoard, GAME_STATUS } from "lib/minesweeper.types";

export interface BoardProps {
  width: number;
  height: number;
  minesProbability: number;
  board?: GameBoard;
  onActiveChanged: (state: boolean) => void;
}

export const Board = (props: BoardProps) => {
  const [board, _setBoard] = useState(props.board || newGame(props.width, props.height, props.minesProbability));
  const [active, setActive] = useState(false);

  useEffect(() => {
    setBoard(props.board || newGame(props.width, props.height, props.minesProbability));
    setActive(false);
  }, [props.height, props.width, props.minesProbability, props.board]);

  useEffect(() => {
    props.onActiveChanged(active);
  }, [props, active]);

  const setBoard = (board: GameBoard) => {
    _setBoard(board);
    setActive(board.status === GAME_STATUS.PLAYING);
  };
  
  const statusClass: Record<GAME_STATUS, string> = {
    [GAME_STATUS.PLAYING]: "board--playing",
    [GAME_STATUS.LOST]: "board--lost",
    [GAME_STATUS.WON]: "board--won",
  };

  return (
    <div className={`board ${statusClass[board.status]}`} role="table">
      {board.cells.map((column, i) => (
        <div key={i} className="board__line" role="row">
          {column.map((cell, j) => (
            <Cell
              key={`${i}-${j}`}
              {...cell}
              onClick={board.status === GAME_STATUS.PLAYING ? () => setBoard(reveal(board, cell)) : undefined}
              onRightClick={(e) => {
                e.preventDefault();
                if (board.status === GAME_STATUS.PLAYING) {
                  setBoard(nextStatus(board, cell));
                }
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

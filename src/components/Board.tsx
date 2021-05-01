import { Cell } from "components/Cell";
import "./Board.scss";
import { useEffect, useState } from "react";
import { newGame, nextStatus, reveal } from "lib/minesweeper";
import { GAME_STATUS } from "lib/minesweeper.types";

export const Board = (props: { width: number; height: number; minesProbability: number }) => {
  const [board, setBoard] = useState(newGame(props.width, props.height, props.minesProbability));
  useEffect(() => {
    setBoard(newGame(props.width, props.height, 0.1));
  }, [props.height, props.width, props.minesProbability]);
  const statusClass: Record<GAME_STATUS, string> = {
    [GAME_STATUS.PLAYING]: "board--playing",
    [GAME_STATUS.LOST]: "board--lost",
    [GAME_STATUS.WON]: "board--won",
  };

  return (
    <div className={`board ${statusClass[board.status]}`}>
      {board.cells.map((column, i) => (
        <div key={i} className="board__line" data-testid="line">
          {column.map((cell, j) => (
            <Cell
              key={`${i}-${j}`}
              {...cell}
              onClick={board.status === GAME_STATUS.PLAYING ? () => setBoard(reveal(board, cell)) : undefined}
              onRightClick={
                board.status === GAME_STATUS.PLAYING
                  ? (e) => {
                      e.preventDefault();
                      setBoard(nextStatus(board, cell));
                    }
                  : undefined
              }
            />
          ))}
        </div>
      ))}
    </div>
  );
};

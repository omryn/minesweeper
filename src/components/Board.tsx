import { Cell } from "components/Cell";
import "./Board.scss";
import { GAME_STATUS } from "lib/minesweeper.types";
import { useAppSelector, usePlayerActions } from "store";

export const Board = () => {
  const board = useAppSelector((state) => state.game);
  const { rightClick, leftClick } = usePlayerActions();

  const statusClass = {
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
              onClick={board.status === GAME_STATUS.PLAYING ? () => leftClick(cell) : undefined}
              onRightClick={(e) => {
                e.preventDefault();
                if (board.status === GAME_STATUS.PLAYING) {
                  rightClick(cell);
                }
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

import { Cell } from "components/Cell";
import "./Board.scss";
import { CELL_STATUS } from "lib/minesweeper.types";

export interface BoardProps {
  width: number;
  height: number;
}
export const Board = (props: BoardProps) => {
  return (
    <div className="board">
      <div className="board__line">
        <Cell status={CELL_STATUS.HIDDEN} value={0} />
        <Cell status={CELL_STATUS.VISIBLE} value={1} />
      </div>
      <div className="board__line">
        <Cell status={CELL_STATUS.USER_MINE} value={0} />
        <Cell status={CELL_STATUS.USER_UNKNOWN} value={1} />
      </div>
    </div>
  );
};

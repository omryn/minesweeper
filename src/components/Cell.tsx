import { CellState, CELL_STATUS, MINE } from "lib/minesweeper.types";
import { MouseEventHandler } from "react";

export interface CellProps extends CellState {
  onClick?: MouseEventHandler;
  onRightClick?: MouseEventHandler;
}

export const Cell = (props: CellProps) => {
  let cellClass: string;
  switch (props.status) {
    case CELL_STATUS.HIDDEN:
      cellClass = "board__cell--hidden";
      break;
    case CELL_STATUS.VISIBLE:
      switch (props.value) {
        case 0:
          cellClass = "board__cell--empty";
          break;
        case MINE:
          cellClass = "board__cell--exploded";
          break;
        default:
          cellClass = "board__cell--visible";
      }
      break;
    case CELL_STATUS.USER_MINE:
      cellClass = "board__cell--hidden board__cell--user-mine";
      break;
    case CELL_STATUS.USER_UNKNOWN:
      cellClass = "board__cell--hidden board__cell--user-unknown";
      break;
  }

  return (
    <div
      role="gridcell"
      onClick={props.onClick}
      onContextMenu={props.onRightClick}
      data-testid="cell"
      className={`board__cell ${cellClass}`}
    >
      {props.status === CELL_STATUS.VISIBLE && props.value > 0 ? props.value : ""}
    </div>
  );
};

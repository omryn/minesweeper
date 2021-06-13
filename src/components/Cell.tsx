import { CellState, CELL_STATUS, MINE } from "lib/minesweeper.types";

export interface CellProps extends CellState {
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
      className={`board__cell ${cellClass}`}
    >
      {props.status === CELL_STATUS.VISIBLE && props.value > 0 ? props.value : ""}
    </div>
  );
};

import { act, fireEvent, render, screen } from "@testing-library/react";
import { withMines, emptyBoard } from "lib/helpers";
import { Provider } from "react-redux";
import { store, systemActions, userActions } from "store";
import App from "./App";

describe("App", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    // store.dispatch(reset())
  });

  describe("timer", () => {
    const board = withMines(emptyBoard(3, 3), [
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 1, y: 2 },
    ]);
    const startApp = () => {
      store.dispatch(systemActions.newBoard(board))
      const cell = screen.getAllByRole("gridcell")[0];
      const timerElm = screen.getByText("00:00");
      return { cell, timerElm };
    };
    const rightClickAndWait = (cell: HTMLElement) =>
      act(() => {
        fireEvent.contextMenu(cell);
        jest.advanceTimersByTime(1001);
      });
    const leftClickAndWait = (cell: HTMLElement, duration = 1001) =>
      act(() => {
        fireEvent.click(cell);
        jest.advanceTimersByTime(duration);
      });

    it("starts the timer after first right click", async () => {
      const { cell, timerElm } = startApp();
      jest.advanceTimersByTime(10000);
      expect(timerElm).toHaveTextContent("00:00");
      rightClickAndWait(cell);
      expect(timerElm).toHaveTextContent("00:01");
    });

    it("starts the timer after first left click", async () => {
      const { cell, timerElm } = startApp();
      jest.advanceTimersByTime(10000);
      expect(timerElm).toHaveTextContent("00:00");
      leftClickAndWait(cell);
      expect(timerElm).toHaveTextContent("00:01");
    });

    it("stops after the game if over", () => {
      const { cell, timerElm } = startApp();
      leftClickAndWait(cell);
      const loosingCell = screen.getAllByRole("gridcell")[4];
      leftClickAndWait(loosingCell, 10000);
      expect(timerElm).toHaveTextContent("00:01");
    });
  });

  describe("header interactive elements", () => {
    it("sets the board width and height", () => {
      const width = 11,
        height = 13;
      fireEvent.change(screen.getByLabelText(/Height/), { target: { value: height } });
      fireEvent.change(screen.getByLabelText(/Width/), { target: { value: width } });
      expect(screen.getAllByRole("row")).toHaveLength(width);
      expect(screen.getAllByRole("gridcell")).toHaveLength(width * height);
    });

    it("reset the game with the user input mine %", () => {
      fireEvent.change(screen.getByLabelText(/Mines/), { target: { value: 0 } });
      fireEvent.click(screen.getAllByRole("gridcell")[0]);
      expect(screen.getAllByRole("gridcell")[0]).toHaveClass("board__cell--empty");

      fireEvent.change(screen.getByLabelText(/Mines/), { target: { value: 99 } });
      expect(screen.getByRole("table")).toHaveClass("board--playing");
      fireEvent.click(screen.getAllByRole("gridcell")[0]);
      expect(screen.getByRole("table")).not.toHaveClass("board--playing");
    });

    it("reset the game when the new game button is clicked", () => {
      fireEvent.click(screen.getAllByRole("gridcell")[0]);
      fireEvent.click(screen.getByLabelText(/New game/));
      expect(screen.getAllByRole("gridcell")[0]).toHaveClass("board__cell--hidden");
    });
  });
});


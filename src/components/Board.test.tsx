import { fireEvent, render, screen } from "@testing-library/react";
import { Board } from "components/Board";
import { emptyBoard, withMines } from "lib/helpers";
import React from "react";
import { Provider } from "react-redux";
import { store, systemActions, userActions } from "store";
import { gameSlice } from "store/game.slice";

describe("Board", () => {
  beforeEach(() => {
    store.dispatch(gameSlice.actions.newGame({width:3,height:3, minesProbability:0.1}))
    render(
      <Provider store={store}>
        <Board />
      </Provider>
    );
  });
  it("newGame creates a width*height board with empty Cells in height lines", () => {
    const height = 5,
      width = 7;
    store.dispatch(gameSlice.actions.newGame({ width, height, minesProbability: 0 }));
    expect(screen.getAllByRole("gridcell")).toHaveLength(width * height);
    screen.getAllByRole("gridcell").forEach((cell) => {
      expect(cell).toBeEmptyDOMElement();
      expect(cell).toHaveClass("board__cell--hidden");
    });
    expect(screen.getAllByRole("row")).toHaveLength(7);
  });

  describe("when user left clicks", () => {
   
    it("reveals the cell content", async () => {
      store.dispatch(
        systemActions.newBoard(
          withMines(emptyBoard(3, 3), [
            { x: 1, y: 0 },
            { x: 1, y: 1 },
            { x: 1, y: 2 },
          ])
        )
      );

      const cell = (await screen.findAllByRole("gridcell"))[0];
      fireEvent.click(cell);
      expect(cell).toHaveClass("board__cell--visible");
    });
  });

  describe("when user right clicks", () => {
    test("first click marks the cell as a mine", async () => {
      const cell = (await screen.findAllByRole("gridcell"))[0];
      fireEvent.contextMenu(cell);
      expect(cell).toHaveClass("board__cell--hidden");
      expect(cell).toHaveClass("board__cell--user-mine");
    });

    test("second click turn the cell to question mark", async () => {
      const cell = (await screen.findAllByRole("gridcell"))[0];
      fireEvent.contextMenu(cell);
      fireEvent.contextMenu(cell);
      expect(cell).toHaveClass("board__cell--hidden");
      expect(cell).toHaveClass("board__cell--user-unknown");
    });
    test("third click turn the cell to hidden", async () => {
      const cell = (await screen.findAllByRole("gridcell"))[0];
      fireEvent.contextMenu(cell);
      fireEvent.contextMenu(cell);
      fireEvent.contextMenu(cell);
      expect(cell).toHaveClass("board__cell--hidden");
      expect(cell).not.toHaveClass("board__cell--user-mine");
      expect(cell).not.toHaveClass("board__cell--user-unknown");
    });
  });
});

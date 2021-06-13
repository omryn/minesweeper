import { fireEvent, render, screen } from "@testing-library/react";
import { Board } from "components/Board";
import { emptyBoard, withMines } from "lib/helpers";

describe("Board", () => {
  it("contains width*height empty Cells in height lines", () => {
    const height = 5,
      width = 7;
    render(<Board height={height} width={width} minesProbability={0.1} onActiveChanged={() => {}} />);
    expect(screen.getAllByRole("gridcell")).toHaveLength(width * height);
    screen.getAllByRole("gridcell").forEach((cell) => {
      expect(cell).toBeEmptyDOMElement();
      expect(cell).toHaveClass("board__cell--hidden");
    });
    expect(screen.getAllByRole("row")).toHaveLength(7);
  });

  describe("when user left clicks", () => {
    const board = withMines(emptyBoard(3, 3), [
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 1, y: 2 },
    ]);

    it("calls onActiveChanged", async () => {
      const setActive = jest.fn();
      render(<Board height={3} width={3} minesProbability={0} onActiveChanged={setActive} board={board} />);
      fireEvent.click((await screen.findAllByRole("gridcell"))[0]);
      expect(setActive).toHaveBeenCalledWith(true);
    });

    it("reveals the cell content", async () => {
      render(<Board height={3} width={3} minesProbability={0} onActiveChanged={() => {}} board={board} />);
      const cell = (await screen.findAllByRole("gridcell"))[0];
      fireEvent.click(cell);
      expect(cell).toHaveClass("board__cell--visible");
    });
  });

  describe("when user right clicks", () => {
    it("calls onActiveChanged", async () => {
      const setActive = jest.fn();
      render(<Board height={3} width={3} minesProbability={0} onActiveChanged={setActive} />);
      fireEvent.contextMenu((await screen.findAllByRole("gridcell"))[0]);
      expect(setActive).toHaveBeenCalledWith(true);
    });

    test("first click marks the cell as a mine", async () => {
      render(<Board height={3} width={3} minesProbability={0} onActiveChanged={() => {}} />);
      const cell = (await screen.findAllByRole("gridcell"))[0];
      fireEvent.contextMenu(cell);
      expect(cell).toHaveClass("board__cell--hidden");
      expect(cell).toHaveClass("board__cell--user-mine");
    });

    test('second click turn the cell to question mark', async()=>{
      render(<Board height={3} width={3} minesProbability={0} onActiveChanged={() => {}} />);
      const cell = (await screen.findAllByRole("gridcell"))[0];
      fireEvent.contextMenu(cell);
      fireEvent.contextMenu(cell);
      expect(cell).toHaveClass("board__cell--hidden");
      expect(cell).toHaveClass("board__cell--user-unknown");
    })
    test('third click turn the cell to hidden', async()=>{
      render(<Board height={3} width={3} minesProbability={0} onActiveChanged={() => {}} />);
      const cell = (await screen.findAllByRole("gridcell"))[0];
      fireEvent.contextMenu(cell);
      fireEvent.contextMenu(cell);
      fireEvent.contextMenu(cell);
      expect(cell).toHaveClass("board__cell--hidden");
      expect(cell).not.toHaveClass("board__cell--user-mine");
      expect(cell).not.toHaveClass("board__cell--user-unknown");
    })
  });
});

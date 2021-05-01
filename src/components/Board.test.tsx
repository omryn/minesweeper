import { render, screen } from "@testing-library/react";
import { Board } from "components/Board";

describe("Board", () => {
  it("contains width*height empty Cells in height lines", () => {
    const height = 5,
      width = 7;
    render(<Board height={height} width={width} minesProbability={0.1} />);
    expect(screen.getAllByRole("gridcell")).toHaveLength(width * height);
    screen.getAllByRole("gridcell").forEach((cell) => {
      expect(cell).toBeEmptyDOMElement();
    });
    expect(screen.getAllByTestId("line")).toHaveLength(5);
  });
});

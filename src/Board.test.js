import React from "react";
import { render, fireEvent, getByText } from "@testing-library/react";
import Board from "./Board";

it("renders without crashing", function () {
  render(<Board />);
});

it("matches snapshot", function () {
  const { asFragment } = render(<Board chanceLightStartsOn={0} />);
  expect(asFragment()).toMatchSnapshot();
});

it("displays win", function () {
  const { getByText } = render(<Board chanceLightStartsOn={0} />);
  expect(getByText("You won!")).toBeInTheDocument();
});

it("flips cells around clicked cell", function () {
  const { getAllByRole } = render(
    <Board nrows={3} ncols={3} chanceLightStartsOn={1} />
  );

  const cells = getAllByRole("button");
  cells.forEach((cell) => {
    expect(cell).toHaveClass("Cell-lit");
  });

  fireEvent.click(cells[4]);
  let litCells = [0, 2, 6, 8];
  cells.forEach((cell, idx) => {
    if (litCells.includes(idx)) {
      expect(cell).toHaveClass("Cell-lit");
    } else {
      expect(cell).not.toHaveClass("Cell-lit");
    }
  });
});

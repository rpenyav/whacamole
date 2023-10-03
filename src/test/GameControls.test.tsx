import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { GameControls } from "../components";

describe("GameControls Component", () => {
  it("should display 'Stop Game' when game is not paused", () => {
    const stopGame = jest.fn();
    const { getByText } = render(
      <GameControls stopGame={stopGame} isGamePaused={false} />
    );
    expect(getByText("Stop Game")).toBeInTheDocument();
  });

  it("should display 'Start game' when game is paused", () => {
    const stopGame = jest.fn();
    const { getByText } = render(
      <GameControls stopGame={stopGame} isGamePaused={true} />
    );
    expect(getByText("Start game")).toBeInTheDocument();
  });

  it("should call stopGame when the button is clicked", () => {
    const stopGame = jest.fn();
    const { getByText } = render(
      <GameControls stopGame={stopGame} isGamePaused={false} />
    );
    const button = getByText("Stop Game");
    fireEvent.click(button);
    expect(stopGame).toHaveBeenCalled();
  });
});

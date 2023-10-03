import { render, fireEvent } from "@testing-library/react";
import { DifficultySelector } from "../components";

describe("DifficultySelector Component", () => {
  it("should call changeDifficulty when a difficulty button is clicked", () => {
    const changeDifficulty = jest.fn();
    const { getByText } = render(
      <DifficultySelector
        difficulty="Bajo"
        changeDifficulty={changeDifficulty}
      />
    );

    fireEvent.click(getByText("Mid"));
    expect(changeDifficulty).toHaveBeenCalledWith("Medio");

    fireEvent.click(getByText("Hard"));
    expect(changeDifficulty).toHaveBeenCalledWith("Alto");

    fireEvent.click(getByText("Low"));
    expect(changeDifficulty).toHaveBeenCalledWith("Bajo");
  });
});

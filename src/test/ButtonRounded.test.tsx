import { render, screen, fireEvent } from "@testing-library/react";
import ButtonRounded from "../components/ButtonRounded";

describe("ButtonRounded Component", () => {
  it("should render ButtonRounded component", () => {
    const mockOnClick = jest.fn();
    render(
      <ButtonRounded color="home" text="Start Game" onClick={mockOnClick} />
    );
    expect(screen.getByText("Start Game")).toBeInTheDocument();
  });

  it("should call onClick when clicked", () => {
    const mockOnClick = jest.fn();
    render(
      <ButtonRounded color="home" text="Start Game" onClick={mockOnClick} />
    );
    fireEvent.click(screen.getByText("Start Game"));
    expect(mockOnClick).toHaveBeenCalled();
  });

  it("should be disabled when disabled prop is true", () => {
    const mockOnClick = jest.fn();
    render(
      <ButtonRounded
        color="home"
        text="Start Game"
        onClick={mockOnClick}
        disabled={true}
      />
    );
    const button = screen.getByText("Start Game") as HTMLButtonElement;
    expect(button).toBeDisabled();
  });

  it("should have the correct color class", () => {
    const mockOnClick = jest.fn();
    render(
      <ButtonRounded color="home" text="Start Game" onClick={mockOnClick} />
    );
    const button = screen.getByText("Start Game");
    expect(button).toHaveClass("button-home");
  });
});

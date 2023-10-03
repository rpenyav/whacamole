import { render, screen } from "@testing-library/react";
import { ScoreBoard } from "../components";

describe("<ScoreBoard />", () => {
  it("should render the score correctly", () => {
    render(<ScoreBoard score={10} />);

    expect(screen.getByText("Score:")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
  });

  it("should change the score when props change", () => {
    // puntaje inicial
    const { rerender } = render(<ScoreBoard score={10} />);

    //cambia el puntaje y vuelve a renderizar
    rerender(<ScoreBoard score={20} />);

    expect(screen.getByText("20")).toBeInTheDocument();
  });
});

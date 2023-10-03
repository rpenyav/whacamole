import { render, fireEvent, screen } from "@testing-library/react";
import { Grid } from "../components";

describe("Grid Component", () => {
  it("should render 9 mole cells", () => {
    const { container } = render(<Grid activeMoleIndex={3} onHit={() => {}} />);
    const moleCells = container.querySelectorAll(".mole-cell");
    expect(moleCells.length).toBe(9);
  });

  it("should execute onHit function when an active mole is clicked", () => {
    const mockOnHit = jest.fn();
    render(<Grid activeMoleIndex={3} onHit={mockOnHit} />);

    const moles = screen.getAllByAltText(/topo|agujero/);
    fireEvent.click(moles[3]);

    expect(mockOnHit).toHaveBeenCalled();
  });

  it("should not execute onHit function when an inactive mole is clicked", () => {
    const mockOnHit = jest.fn();
    render(<Grid activeMoleIndex={3} onHit={mockOnHit} />);

    const moles = screen.getAllByAltText(/topo|agujero/);
    fireEvent.click(moles[4]);

    expect(mockOnHit).not.toHaveBeenCalled();
  });
});

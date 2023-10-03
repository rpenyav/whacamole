import { render, screen, fireEvent, act } from "@testing-library/react";
import { Mole } from "../components";

describe("Mole Component", () => {
  jest.useFakeTimers();

  it("should render mole when isActive is true", () => {
    render(<Mole isActive={true} onHit={jest.fn()} />);
    expect(screen.getByAltText("topo")).toBeInTheDocument();
  });

  it("should render hole when isActive is false", () => {
    render(<Mole isActive={false} onHit={jest.fn()} />);
    expect(screen.getByAltText("agujero")).toBeInTheDocument();
  });

  it("should call onHit when mole is clicked", () => {
    const mockOnHit = jest.fn();
    render(<Mole isActive={true} onHit={mockOnHit} />);

    fireEvent.click(screen.getByAltText("topo"));
    expect(mockOnHit).toHaveBeenCalledTimes(1);
  });

  it("should not call onHit when hole is clicked", () => {
    const mockOnHit = jest.fn();
    render(<Mole isActive={false} onHit={mockOnHit} />);

    fireEvent.click(screen.getByAltText("agujero"));
    expect(mockOnHit).not.toHaveBeenCalled();
  });

  it("should temporarily set the topoactivo class when clicked", () => {
    const mockOnHit = jest.fn();
    render(<Mole isActive={true} onHit={mockOnHit} />);

    fireEvent.click(screen.getByAltText("topo"));

    const topo = screen.getByAltText("topo");
    expect(topo).toHaveClass("topoactivo");

    //tiempo de espera.
    act(() => {
      jest.advanceTimersByTime(500);
    });

    //topoactivo se elimina.
    expect(topo).not.toHaveClass("topoactivo");
  });
});

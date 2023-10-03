import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useNavigate } from "react-router-dom";
import Layout from "../layout/Layout";

//useNavigate
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("<Layout />", () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    Object.defineProperty(window, "localStorage", {
      value: {
        clear: jest.fn(),
      },
      writable: true,
    });
  });

  it("should render correctly", () => {
    const children = <div>children</div>;
    render(<Layout>{children}</Layout>);
    expect(screen.getByText("Whac-A-Mole")).toBeInTheDocument();
    expect(screen.getByText("children")).toBeInTheDocument();
  });

  it("should call handleLogout and navigate to home when the exit icon is clicked", () => {
    render(<Layout>{<div>children</div>}</Layout>);

    userEvent.click(screen.getByAltText("exit/disconnect"));

    expect(localStorage.clear).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});

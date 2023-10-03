import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";

import { topo } from "../assets/";
import Home from "../pages/HomePage";

describe("Home Page", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
  });

  it("should render Home component", () => {
    expect(screen.getByPlaceholderText("Enter your name")).toBeInTheDocument();
    expect(screen.getByText("Start Game")).toBeInTheDocument();
  });

  it("should update input value", () => {
    const input = screen.getByPlaceholderText(
      "Enter your name"
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { value: "Perico Palotes" } });
    expect(input.value).toBe("Perico Palotes");
  });

  it("should navigate to /game on button click", async () => {
    const input = screen.getByPlaceholderText(
      "Enter your name"
    ) as HTMLInputElement;
    const button = screen.getByText("Start Game");

    fireEvent.change(input, { target: { value: "Perico Palotes" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(localStorage.getItem("userName")).toBe("Perico Palotes");
    });
  });

  it("should disable the button if name is not provided", () => {
    const button = screen.getByText("Start Game") as HTMLButtonElement;
    expect(button).toBeDisabled();

    const input = screen.getByPlaceholderText(
      "Enter your name"
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { value: "" } });
    expect(button).toBeDisabled();

    fireEvent.change(input, { target: { value: "Perico Palotes" } });
    expect(button).toBeEnabled();
  });

  it("should set CSS property for background image", async () => {
    await waitFor(() => {
      expect(
        document.documentElement.style.getPropertyValue("--background-image")
      ).toBe(`url(${topo})`);
    });
  });
});

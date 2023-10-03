import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import AppRouter from "../router/AppRouter";

describe("AppRouter", () => {
  it("should render HomePage at /", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AppRouter />
      </MemoryRouter>
    );
    expect(await screen.findByText("Start Game")).toBeInTheDocument();
  });

  it("should render GamePage at /game", async () => {
    render(
      <MemoryRouter initialEntries={["/game"]}>
        <AppRouter />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText(/Start Game/i)).toBeInTheDocument();
    });
  });

  it("should render NoMatchPage at unknown route", async () => {
    render(
      <MemoryRouter initialEntries={["/unknown"]}>
        <AppRouter />
      </MemoryRouter>
    );
    expect(await screen.findByText("ERROR 404")).toBeInTheDocument();
  });
});

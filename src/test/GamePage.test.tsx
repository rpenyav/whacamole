import { render, screen } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import useGameLogic from "../hooks/useGameLogic";
import GamePage from "../pages/GamePage";

//useNavigate
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

jest.mock("../hooks/useGameLogic", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("GamePage Component test", () => {
  const mockNavigate = jest.fn();
  const mockUseGameLogic = {
    userName: "Perico Palotes",
    score: 10,
    difficulty: "Bajo",
    changeDifficulty: jest.fn(),
    activeMoleIndex: 2,
    isGamePaused: false,
    handleHit: jest.fn(),
    toggleGamePause: jest.fn(),
    timeLeft: 30,
  };

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useGameLogic as jest.Mock).mockReturnValue(mockUseGameLogic);

    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: jest.fn(),
        setItem: jest.fn(),
        clear: jest.fn(),
      },
      writable: true,
    });
  });

  it("should render the GamePage with initial state", () => {
    render(<GamePage />);
    const welcomeMessage = screen.getByTestId("welcome-message");
    expect(welcomeMessage).toHaveTextContent("Welcome, Perico Palotes");
  });
});

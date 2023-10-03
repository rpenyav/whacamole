import { act, renderHook } from "@testing-library/react-hooks";
import useGameLogic from "../hooks/useGameLogic";
import Swal from "sweetalert2";

jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
}));

describe("useGameLogic", () => {
  let result: any;
  jest.useFakeTimers();

  beforeEach(() => {
    localStorage.clear();

    const { result: hookResult } = renderHook(() => useGameLogic());
    result = hookResult;
  });

  it("should initialize with default values", () => {
    expect(result.current.score).toBe(0);
    expect(result.current.difficulty).toBe("Bajo");
    expect(result.current.activeMoleIndex).toBe(-1);
    expect(result.current.isGamePaused).toBe(true);
    expect(result.current.timeLeft).toBe(120);
  });

  it("should be able to change difficulty", () => {
    act(() => {
      result.current.changeDifficulty("Alto");
    });
    expect(result.current.difficulty).toBe("Alto");
  });

  it("should handle hit correctly", () => {
    act(() => {
      result.current.handleHit();
    });
    expect(result.current.score).toBe(10);
  });

  it("should toggle game pause", () => {
    act(() => {
      result.current.toggleGamePause();
    });
    expect(result.current.isGamePaused).toBe(false);
  });

  it("should load from localStorage if available", () => {
    localStorage.setItem("gameDifficulty", "Alto");
    localStorage.setItem("gameScore", "50");

    const { result } = renderHook(() => useGameLogic());

    expect(result.current.difficulty).toBe("Alto");
    expect(result.current.score).toBe(50);
  });

  it("should toggle the mole position", () => {
    act(() => {
      result.current.toggleMole();
    });

    expect(result.current.activeMoleIndex).toBeGreaterThanOrEqual(0);
    expect(result.current.activeMoleIndex).toBeLessThan(9);
  });

  it("should reset the game correctly", () => {
    act(() => {
      result.current.resetGame();
    });

    expect(result.current.score).toBe(0);
    expect(result.current.timeLeft).toBe(120);
    expect(result.current.isGamePaused).toBe(false);
  });

  it("should decrement time when game is not paused", () => {
    act(() => {
      //el juego no está en pausa
      result.current.toggleGamePause();
    });

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current.timeLeft).toBe(119);
  });

  it("should pause time decrement when game is paused", () => {
    jest.advanceTimersByTime(1000);

    expect(result.current.timeLeft).toBe(120);
  });

  it("should update local storage when changing difficulty", () => {
    act(() => {
      result.current.changeDifficulty("Alto");
    });

    expect(localStorage.getItem("gameDifficulty")).toBe("Alto");
  });
});

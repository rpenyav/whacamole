import { useState, useEffect } from "react";
import Swal from "sweetalert2";

interface DifficultyConfig {
  time: number;
  points: number;
}

interface Difficulties {
  [key: string]: DifficultyConfig;
}

/**
 * Lógica del juego.
 * @returns funciones y valores del juego.
 */

const useGameLogic = () => {
  const userName = localStorage.getItem("userName");

  const [score, setScore] = useState<number>(0);
  const [difficulty, setDifficulty] = useState<string>("Bajo");
  const [activeMoleIndex, setActiveMoleIndex] = useState<number>(-1);
  const [isGamePaused, setGamePaused] = useState<boolean>(true);
  const [timeLeft, setTimeLeft] = useState<number>(120); // 2 minutos en segundos

  const changeDifficulty = (newDifficulty: string) => {
    setDifficulty(newDifficulty);
    localStorage.setItem("gameDifficulty", newDifficulty);
  };

  const difficulties: Difficulties = {
    Bajo: { time: 1000, points: 10 },
    Medio: { time: 750, points: 20 },
    Alto: { time: 500, points: 30 },
  };

  const toggleMole = () => {
    const { time } = difficulties[difficulty];
    const randomIndex = Math.floor(Math.random() * 9);
    setActiveMoleIndex(randomIndex);
    setTimeout(() => {
      setActiveMoleIndex(-1);
    }, time);
  };

  const resetGame = () => {
    setScore(0);
    debugger;
    setTimeLeft(120);
    setGamePaused(false);
  };

  useEffect(() => {
    let moleTimer: NodeJS.Timeout;
    let countdownTimer: NodeJS.Timeout;

    if (!isGamePaused) {
      moleTimer = setInterval(() => {
        toggleMole();
      }, 1500);

      countdownTimer = setInterval(() => {
        setTimeLeft((prevTimeLeft) => {
          if (prevTimeLeft <= 0) {
            //el juego acaba al llegar a 0
            setGamePaused(true);
            clearInterval(moleTimer);
            clearInterval(countdownTimer);

            Swal.fire({
              title: "Game Over",
              text: `Your final score: ${localStorage.getItem("gameScore")}`,
              icon: "info",
              confirmButtonText: "Play again",
            }).then((result) => {
              if (result.isConfirmed) {
                localStorage.removeItem("gameScore"); //reseteamos el score para empezar de nuevo
                resetGame();
              }
            });
          }
          return prevTimeLeft - 1;
        });
      }, 1000);
    }

    return () => {
      clearInterval(moleTimer);
      clearInterval(countdownTimer);
    };
  }, [difficulty, isGamePaused]);

  const handleHit = () => {
    const { points } = difficulties[difficulty];
    setScore((prevScore) => {
      const newScore = prevScore + points;
      localStorage.setItem("gameScore", newScore.toString());
      return newScore;
    });
  };

  useEffect(() => {
    const savedDifficulty = localStorage.getItem("gameDifficulty");
    const savedScore = localStorage.getItem("gameScore");

    if (savedDifficulty) {
      setDifficulty(savedDifficulty);
    }

    if (savedScore) {
      setScore(parseInt(savedScore, 10));
    }
  }, []);

  const toggleGamePause = () => {
    setGamePaused((prevState) => !prevState);
  };

  return {
    userName,
    score,
    setScore,
    difficulty,
    setDifficulty,
    activeMoleIndex,
    setActiveMoleIndex,
    changeDifficulty,
    isGamePaused,
    setGamePaused,
    handleHit,
    toggleMole,
    toggleGamePause,
    timeLeft,
  };
};

export default useGameLogic;
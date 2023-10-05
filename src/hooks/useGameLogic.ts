import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useManageScore } from "./useManageScore";
import { useOnlineStatus } from "./useOnlineStatus";

interface DifficultyConfig {
  time: number;
  points: number;
}

interface Difficulties {
  [key: string]: DifficultyConfig;
}

const useGameLogic = () => {
  const userName = localStorage.getItem("userName");
  const isOnline = useOnlineStatus();
  const [score, setScore] = useState<number>(0);
  const [difficulty, setDifficulty] = useState<string>("Bajo");
  const [activeMoleIndex, setActiveMoleIndex] = useState<number>(-1);
  const [isGamePaused, setGamePaused] = useState<boolean>(true);
  const [timeLeft, setTimeLeft] = useState<number>(10);
  const [hasUpdatedScore, setHasUpdatedScore] = useState<boolean>(false);

  const { updateScoreMutation } = useManageScore();

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
    setTimeLeft(120);
    setGamePaused(false);
  };

  const toggleMoleRef = useRef(toggleMole);

  useEffect(() => {
    toggleMoleRef.current = toggleMole;
  }, [toggleMole]);

  useEffect(() => {
    let moleTimer: NodeJS.Timeout;
    let countdownTimer: NodeJS.Timeout;

    if (!isGamePaused) {
      moleTimer = setInterval(() => {
        toggleMoleRef.current();
      }, 1500);

      countdownTimer = setInterval(() => {
        setTimeLeft((prevTimeLeft) => {
          if (prevTimeLeft <= 0 && !hasUpdatedScore) {
            setGamePaused(true);
            clearInterval(moleTimer);
            clearInterval(countdownTimer);

            Swal.fire({
              title: "Game Over",
              text: `Your final score: ${localStorage.getItem("gameScore")}`,
              icon: "info",
              confirmButtonText: "Play again",
            }).then((result) => {
              if (isOnline) {
                if (userName !== null) {
                  const scoreString = localStorage.getItem("gameScore");
                  const score = parseInt(scoreString!, 10);
                  if (!hasUpdatedScore) {
                    updateScoreMutation.mutate({ userName, score });
                    setHasUpdatedScore(true); // Marca que ya se ha actualizado
                  }
                }
              } else {
                // Si no hay conexión a Internet, muestra un mensaje al usuario.
                Swal.fire({
                  title: "No internet connection",
                  text: "Your score will be saved locally and synchronized when you're online.",
                  icon: "warning",
                  confirmButtonText: "OK",
                });
              }

              if (result.isConfirmed) {
                localStorage.removeItem("gameScore");
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
  }, [difficulty, isGamePaused, hasUpdatedScore]);

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
    resetGame,
  };
};

export default useGameLogic;

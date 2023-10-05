import { FC, useEffect } from "react";
import Layout from "../layout/Layout";
import {
  Grid,
  ScoreBoard,
  GameControls,
  DifficultySelector,
} from "../components/index";
import useGameLogic from "../hooks/useGameLogic";
import { formatTime } from "../helpers/formatTime";
import { useNavigate } from "react-router-dom";

const GamePage: FC = () => {
  const user = localStorage.getItem("userName");
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null || user === "") {
      navigate("/");
    }
  }, [user, navigate]);

  const {
    userName,
    score,
    difficulty,
    changeDifficulty,
    activeMoleIndex,
    isGamePaused,
    handleHit,
    toggleGamePause,
    timeLeft,
  } = useGameLogic();

  const formattedTime = formatTime(timeLeft);
  const isWarning = timeLeft <= 20; //cambia de color cuand oquedan 20 segundos

  return (
    <Layout>
      <h3 className="mt-4" data-testid="welcome-message">
        Welcome, <span className="name-user">{userName}</span>
      </h3>
      <DifficultySelector
        difficulty={difficulty}
        changeDifficulty={changeDifficulty}
      />
      <ScoreBoard score={score} />
      <div className="card ms-3 me-3 pt-3 pb-3">
        <Grid activeMoleIndex={activeMoleIndex} onHit={handleHit} />
      </div>
      <div className={`time-left mt-3 ${isWarning ? "warning" : ""}`}>
        <div className="card ms-3 me-3">{`Time Left: ${formattedTime} seconds`}</div>
      </div>
      <GameControls stopGame={toggleGamePause} isGamePaused={isGamePaused} />
    </Layout>
  );
};

export default GamePage;

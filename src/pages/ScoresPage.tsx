import { FC } from "react";
import Layout from "../layout/Layout";
import {
  Grid,
  ScoreBoard,
  GameControls,
  DifficultySelector,
  ButtonRounded,
} from "../components/index";
import useGameLogic from "../hooks/useGameLogic";
import { formatTime } from "../helpers/formatTime";
import { useNavigate } from "react-router-dom";

const ScoresPage: FC = () => {
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
  const navigate = useNavigate();
  const formattedTime = formatTime(timeLeft);
  const isWarning = timeLeft <= 20; //cambia de color cuand oquedan 20 segundos

  const handleGotoGame = () => {
    navigate("/game");
  };

  return (
    <Layout>
      <h3 data-testid="welcome-message">
        Hi, <span className="name-user">{userName}</span>, this is the Wall of
        Fame
      </h3>

      <div className="card ms-3 me-3 pt-3 pb-3">scores</div>
      <div className="d-flex justify-content-center mt-4">
        <div className="col-2">
          <ButtonRounded
            isActive={true}
            disabled={false}
            color={"#1386d6"}
            text={"Try again!"}
            onClick={handleGotoGame}
          />
        </div>
      </div>
    </Layout>
  );
};

export default ScoresPage;

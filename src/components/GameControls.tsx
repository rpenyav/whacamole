import React from "react";

interface GameControlsProps {
  stopGame: () => void;
  isGamePaused: boolean;
}

const GameControls: React.FC<GameControlsProps> = ({
  stopGame,
  isGamePaused,
}) => {
  return (
    <div className="d-flex justify-content-center">
      <div className="ms-3 me-3 mt-5 mb-4 cont-button">
        <button className="button-rounded button-home" onClick={stopGame}>
          {isGamePaused ? "Start game" : "Stop Game"}{" "}
        </button>
      </div>
    </div>
  );
};

export default GameControls;

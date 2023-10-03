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
    <div>
      <div className="ms-5 me-5 mt-5">
        <button className="button-rounded button-home" onClick={stopGame}>
          {isGamePaused ? "Start game" : "Stop Game"}{" "}
        </button>
      </div>
    </div>
  );
};

export default GameControls;

import React from "react";

interface ScoreBoardProps {
  score: number;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ score }) => {
  return (
    <div className="mt-5 mb-4">
      <div>
        Score: <strong className="orange-home">{score}</strong>
      </div>
    </div>
  );
};

export default ScoreBoard;

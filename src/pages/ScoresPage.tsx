import { FC } from "react";
import Layout from "../layout/Layout";
import { ButtonRounded } from "../components/index";
import useGameLogic from "../hooks/useGameLogic";
import { useNavigate } from "react-router-dom";
import { ScoreData, useManageScore } from "../hooks/useManageScore";
import { Score, useScores } from "../hooks/useScores";

const ScoresPage: FC = () => {
  const { userName } = useGameLogic();
  const navigate = useNavigate();
  const handleGotoGame = () => {
    navigate("/game");
  };

  const scores = useScores();

  return (
    <Layout>
      <h3 data-testid="welcome-message">
        Hi, <span className="name-user">{userName}</span>, this is the Wall of
        Fame
      </h3>

      <div className="card ms-5 me-5 pt-3 pb-3">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Username</th>
              <th scope="col">Score</th>
              <th scope="col">Created At</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((score: Score, index: number) => (
              <tr key={index}>
                <td>
                  <span className="name-user">{score.userName}</span>
                </td>
                <td>{score.score}</td>
                <td>{new Date(score.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="d-flex justify-content-center mt-4">
        <div className="col-4">
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

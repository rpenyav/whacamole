import { FC } from "react";
import ButtonRounded from "./ButtonRounded";

interface DifficultySelectorProps {
  difficulty: string;
  changeDifficulty: (newDifficulty: string) => void;
}

const DifficultySelector: FC<DifficultySelectorProps> = ({
  difficulty,
  changeDifficulty,
}) => {
  return (
    <div className="ps-5 pe-5 mb-5 botonera">
      <p>Choose your difficulty level</p>
      <div className="d-flex justify-content-between">
        <div>
          <ButtonRounded
            padding="4px 22px"
            color="low"
            text="Low"
            isActive={difficulty === "Bajo"}
            onClick={() => changeDifficulty("Bajo")}
          />
        </div>
        <div>
          <ButtonRounded
            padding="4px 22px"
            color="mid"
            text="Mid"
            isActive={difficulty === "Medio"}
            onClick={() => changeDifficulty("Medio")}
          />
        </div>
        <div>
          <ButtonRounded
            padding="4px 22px"
            color="hard"
            text="Hard"
            isActive={difficulty === "Alto"}
            onClick={() => changeDifficulty("Alto")}
          />
        </div>
      </div>
    </div>
  );
};

export default DifficultySelector;

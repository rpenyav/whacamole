import { FC } from "react";
import Mole from "./Mole";

interface GridProps {
  activeMoleIndex: number;
  onHit: () => void;
}

const Grid: FC<GridProps> = ({ activeMoleIndex, onHit }) => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div className="mole-grid">
        {Array.from({ length: 9 }, (_, index) => (
          <div key={index} className="mole-cell">
            <Mole isActive={index === activeMoleIndex} onHit={onHit} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Grid;

import React, { FC, useEffect, useState } from "react";
import backgroundImage from "../assets/topo.svg";
import { agujero, topogame } from "../assets";

interface MoleProps {
  isActive: boolean;
  onHit: () => void;
}

const Mole: FC<MoleProps> = ({ isActive, onHit }) => {
  const [topoactivo, setTopoactivo] = useState("");

  const handleMoleClick = () => {
    onHit();
    setTopoactivo("topoactivo");
  };

  useEffect(() => {
    setTimeout(() => {
      setTopoactivo("");
    }, 500);
  }, [topoactivo]);

  return (
    <div onClick={isActive ? handleMoleClick : undefined}>
      {isActive ? (
        <img
          className={`topo active ${topoactivo}`}
          src={topogame}
          alt="topo"
        />
      ) : (
        <img className="agujero" src={agujero} alt="agujero" />
      )}
    </div>
  );
};

export default Mole;

import React from "react";
import useDragger from "../hooks/useDragger";

const BuildingMovable: React.FC<{ name: string, amount: number }> = ({ name, amount }) => {
  const componentId: string = "building-" + crypto.randomUUID();

  useDragger(componentId);
  const imageName = name + ".png";

  return (
    <div id={componentId} className="building-box">
      <img draggable={false} className="building-image" src={`/buildings/${imageName}`} alt={name} />
      <div className="amount-badge">Amount: {amount}</div>
    </div>
  );
};

export default BuildingMovable;

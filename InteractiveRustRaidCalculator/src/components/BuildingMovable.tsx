import React from "react";
import type Building from "../objects/Building";
import useDragger from "../hooks/useDragger";

interface BuildingMovableProps {
  building: Building;
  onAmountChange: (amount: number) => void;
  onPositionChange: (x: number, y: number) => void;
  onDelete: () => void;
}

const BuildingMovable: React.FC<BuildingMovableProps> = ({ building, onAmountChange, onPositionChange, onDelete }) => {
  const imageName = building.getName() + ".png";

  useDragger(building.getId(), onPositionChange);

  const handleWheel = (e: React.WheelEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const delta = Math.sign(e.deltaY);
    const newAmount = Math.min(999, Math.max(1, building.getAmount() - delta));
    onAmountChange(newAmount);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = Number(e.target.value);
    value = Math.max(1, Math.min(999, value));
    onAmountChange(value);
  };

  return (
    <div
      id={building.getId()}
      className="building-box"
      style={{ left: building.getX(), top: building.getY(), position: "absolute" }}
    >
      <button className="building-delete-button" onClick={() => { onDelete(); }}>
        <img className="building-delete-button-icon" src="/icons/cross_icon.png" alt="X"></img>
      </button>
      <img draggable={false} className="building-image" src={`/buildings/${imageName}`} alt={building.getName()} />
      <div className="amount-container">
        <span className="amount-label">Amount:</span>
        <input
          className="amount-input"
          type="number"
          min={1}
          max={999}
          value={building.getAmount()}
          onChange={handleChange}
          onWheel={handleWheel}
        />
      </div>
    </div>
  );
};

export default BuildingMovable;
import React from "react";
import useDragger from "../hooks/useDragger";

const BuildingMovable: React.FC<{ name: string, amount: number }> = ({ name, amount: initialAmount }) => {
  const componentId: string = "building-" + crypto.randomUUID();
  const [amount, setAmount] = React.useState(initialAmount);

  React.useEffect(() => {
    if (amount < 1) {
      setAmount(1);
    } else if (amount > 999) {
      setAmount(999);
    }
  }, [amount]);

  useDragger(componentId);
  const imageName = name + ".png";

  const handleWheel = (e: React.WheelEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const delta = Math.sign(e.deltaY);
    setAmount((prevAmount) => Math.min(999, Math.max(1, prevAmount - delta)));
  };

  return (
    <div id={componentId} className="building-box">
      <button className="building-delete-button" onClick={() => {
        const element = document.getElementById(componentId);
        if (element) {
          element.remove();
        }
      }}>
        <img className="building-delete-button-icon" src="/icons/cross_icon.png" alt="X"></img>
      </button>
      <img draggable={false} className="building-image" src={`/buildings/${imageName}`} alt={name} />
      <div className="amount-container">
        <span className="amount-label">Amount:</span>
        <input
          className="amount-input"
          type="number"
          min={1}
          max={999}
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          onWheel={handleWheel}
        />
      </div>
    </div>
  );
};

export default BuildingMovable;

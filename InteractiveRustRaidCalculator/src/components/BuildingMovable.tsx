import React from "react";
import useDragger from "../hooks/useDragger";

const BuildingMovable: React.FC<{ id: string }> = ({ id }) => {
  useDragger(id);

  return (
    <div id={`${id}`} className="box">
    </div>
  );
};

export default BuildingMovable;

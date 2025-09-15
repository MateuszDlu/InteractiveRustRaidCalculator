import { useCallback, useState } from "react";
import BuildingMovable from "./components/BuildingMovable";
import BuildingContextMenu from "./components/BuildingContextMenu";
import Building from "./objects/Building";
import useLogger from "./hooks/useLogger";

interface ContextMenuState {
  visible: boolean;
  x: number;
  y: number;
}

const SandboxArea: React.FC = () => {
  const initialContextMenu = { visible: false, x: 0, y: 0 };
  const [contextMenu, setContextMenu] = useState<ContextMenuState>(initialContextMenu);
  const [buildings, setBuildings] = useState<Building[]>([]);

  useLogger("Buildings", buildings);

  function handleContextMenu(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.preventDefault();
    setContextMenu({ visible: true, x: e.pageX, y: e.pageY });
  }

  function handleAddBuilding(name: string) {
    const newBuilding = new Building(name, 1, contextMenu.x, contextMenu.y);
    setBuildings(prev => [...prev, newBuilding]);
    setContextMenu(initialContextMenu);
  }

  function handleAmountChange(id: string, newAmount: number) {
  setBuildings(buildings =>
    buildings.map(b =>
      b.getId() === id
        ? new Building(b.getName(), newAmount, b.getX(), b.getY(), b.getId()) // keep ID
        : b
    )
  );
}

  const handlePositionChange = useCallback((id: string, x: number, y: number) => {
    setBuildings(buildings =>
      buildings.map(b =>
        b.getId() === id
          ? new Building(b.getName(), b.getAmount(), x, y, b.getId())
          : b
      )
    );
  }, []);

  const handleDelete = useCallback((id: string) => {
    setBuildings(buildings => buildings.filter(b => b.getId() !== id));
  }, []);

  return (
    <div className="sandbox-area" onContextMenu={handleContextMenu}>
      {contextMenu.visible && (
        <BuildingContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          closeMenu={() => setContextMenu(initialContextMenu)}
          onAddBuilding={handleAddBuilding}
        />
      )}
      {buildings.map((building) => (
        <BuildingMovable
          key={building.getId()}
          building={building}
          onAmountChange={(newAmount) => handleAmountChange(building.getId(), newAmount)}
          onPositionChange={(x, y) => handlePositionChange(building.getId(), x, y)}
          onDelete={() => handleDelete(building.getId())}
        />
      ))}
      <span className="add-buildings-instruction">
        Add buildings with <img className="rmb-icon" draggable={false} src="/icons/RMB_icon.png" alt="RMB" /> and scroll to adjust amount
      </span>
    </div>
  );
};

export default SandboxArea;
import { useState } from "react";
import BuildingMovable from "./components/BuildingMovable"
import BuildingContextMenu from "./components/BuildingContextMenu";


const SandboxArea: React.FC = () => {
  const initialContextMenu = { visible: false, x: 0, y: 0 };
  const [contextMenu, setContextMenu] = useState(initialContextMenu);

  const contextMenuClose = () => setContextMenu(initialContextMenu);

  function handleContextMenu(e: React.MouseEvent<HTMLDivElement, MouseEvent>){
    e.preventDefault();

    const {pageX, pageY} = e;
    setContextMenu({ visible: true, x: pageX, y: pageY });
  }
  
  return(
    <div className="sandbox-area" onContextMenu={e => handleContextMenu(e)}>
      {contextMenu.visible && <BuildingContextMenu x={contextMenu.x} y={contextMenu.y} closeMenu={contextMenuClose}/>}
      <BuildingMovable name="sheetmetal_door" amount={2}></BuildingMovable>
      <BuildingMovable name="armored_wall" amount={1}></BuildingMovable>
    </div>
  )
}

export default SandboxArea
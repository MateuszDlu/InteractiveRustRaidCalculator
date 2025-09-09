import React, { useState } from 'react';
import { useOnClickOutside } from '../hooks/useOnClickOutside';

interface BuildingContextMenuProps {
  x: number;
  y: number;
  closeMenu: () => void;
}

const submenuOptions = {
  Walls: [{ label: 'Wooden Wall', image: 'wood_wall' },
    { label: 'Stone Wall', image: 'stone_wall' },
    { label: 'Sheetmetal Wall', image: 'sheetmetal_wall' },
    { label: 'Armored Wall', image: 'armored_wall' },
    { label: 'External Wooden Wall', image: 'external_wood_wall' },
    { label: 'External Stone Wall', image: 'external_stone_wall' },
    { label: 'Metal Shop Front', image: 'metal_shop_front' }],
  Doors: [{ label: 'Wooden Door', image: 'wood_door' },
    { label: 'Sheetmetal Door', image: 'sheetmetal_door' },
    { label: 'Ladder Hatch', image: 'ladder_hatch' },
    { label: 'Garage Door', image: 'garage_door' },
    { label: 'Armored Door', image: 'armored_door' }],
  Windows: [{ label: 'Wooden Window Bars', image: 'wood_window' },
    { label: 'Sheetmetal Embrasure', image: 'sheetmetal_embrasure' },
    { label: 'Reinforced Glass Window', image: 'reinforced_glass_window' },
    { label: 'Metal Window Bars', image: 'metal_window' }],
  Objects: [{ label: 'Wooden Barbed Barricade', image: 'wood_barricade' },
    { label: 'Metal Barbed Barricade', image: 'metal_barricade' },
    { label: 'Workbench level 2', image: 'wb_lvl2' },
    { label: 'Workbench level 3', image: 'wb_lvl3' },
    { label: 'Auto Turret', image: 'auto_turret' },
    { label: 'Tool Cupboard', image: 'tool_cupboard' },
    { label: 'Vending Machine', image: 'vending_machine' }
  ]
}

const BuildingContextMenu: React.FC<BuildingContextMenuProps> = ({ x, y , closeMenu }) => {
  const contextMenuRef = React.useRef<HTMLDivElement>(null);
  useOnClickOutside(contextMenuRef, closeMenu);

  const [openSubmenu, setOpenSubmenu] = useState<keyof typeof submenuOptions | null>(null);

  function addBuilding(sub: string): void {
    console.log(`Adding building: ${sub}`); //TODO
  }

  return (
    <div 
      ref={contextMenuRef}
      style={{ position: 'absolute', zIndex: 1000, left: `${x}px`, top: `${y}px` }}>
      <div className="context-menu">
        {Object.keys(submenuOptions).map((option) => (
          <div
            key={option}
            className="context-menu-option"
            onMouseEnter={() => setOpenSubmenu(option as keyof typeof submenuOptions)}
            onMouseLeave={() => setOpenSubmenu(null)}
          >
            {option}
            {/* Submenu */}
            {openSubmenu === option && (
              <div className="context-submenu">
                {submenuOptions[option].map((sub) => (
                  <div
                    key={sub.label}
                    className="context-menu-option"
                    onClick={() => addBuilding(sub.image)}
                  >
                    {sub.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuildingContextMenu;
import React from 'react';
import { useOnClickOutside } from '../hooks/useOnClickOutside';

interface BuildingContextMenuProps {
  x: number;
  y: number;
  closeMenu: () => void;
}

const BuildingContextMenu: React.FC<BuildingContextMenuProps> = ({ x, y , closeMenu }) => {
  const contextMenuRef = React.useRef<HTMLDivElement>(null);
  useOnClickOutside(contextMenuRef, closeMenu);

  return (
    <div 
      ref={contextMenuRef}
      style={{ position: 'absolute', zIndex: 1000, left: `${x}px`, top: `${y}px` }}>
      <div className="context-menu">
        <span>Context Menu</span>
        {/* Add more menu items here */}
      </div>
    </div>
  );
};

export default BuildingContextMenu;
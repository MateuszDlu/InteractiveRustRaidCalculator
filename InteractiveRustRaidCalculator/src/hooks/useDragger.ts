import { useEffect, useRef } from "react";

function useDragger(id: string, onPositionChange: (x: number, y: number) => void): void {
  const isDragging = useRef(false);
  const lastMouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const target = document.getElementById(id);
    if (!target) throw new Error("Element with given id not found");

    let pos = { x: 0, y: 0 };

    const onMouseDown = (e: MouseEvent) => {
      if (e.button !== 0) return; // only left mouse
      if ((e.target as HTMLElement).closest("input, button")) return;

      const rect = target.getBoundingClientRect();
      const parentRect = target.parentElement!.getBoundingClientRect();

      pos.x = rect.left - parentRect.left;
      pos.y = rect.top - parentRect.top;

      isDragging.current = true;
      lastMouse.current = { x: e.clientX, y: e.clientY };

      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;

      const dx = e.clientX - lastMouse.current.x;
      const dy = e.clientY - lastMouse.current.y;

      pos.x += dx;
      pos.y += dy;

      lastMouse.current = { x: e.clientX, y: e.clientY };

      target.style.left = `${pos.x}px`;
      target.style.top = `${pos.y}px`;
    };

    const onMouseUp = () => {
      isDragging.current = false;
      onPositionChange(pos.x, pos.y); // sync to React once
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };


    target.addEventListener("mousedown", onMouseDown);

    return () => {
      target.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [id, onPositionChange]);
}

export default useDragger;

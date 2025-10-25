import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectShape } from "../slices/shapesSlice";
import "../styles/Sidebar.css";

export default function Sidebar() {
  const shapes = useSelector((s) => s.shapes.items);
  const selectedId = useSelector((s) => s.shapes.selectedId);
  const dispatch = useDispatch();

  return (
    <div className="sidebar">
      <h2>Elements</h2>
      <ul>
        {shapes.map((shape) => (
          <li
            key={shape.id}
            onClick={() => dispatch(selectShape(shape.id))}
            className={selectedId === shape.id ? "selected" : ""}
          >
            <div className="shape-title">
              {shape.type.toUpperCase()} #{shape.id}
            </div>
            <div className="shape-meta">
              ({Math.round(shape.x)}, {Math.round(shape.y)})
            </div>
          </li>
        ))}
      </ul>
      {shapes.length === 0 && (
        <p className="empty">No shapes added yet. Use the toolbar above.</p>
      )}
    </div>
  );
}

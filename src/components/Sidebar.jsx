import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectShape } from "../redux/shapesSlice";

const Sidebar = () => {
  const shapes = useSelector((s) => s.shapes.items);
  const selectedId = useSelector((s) => s.shapes.selectedId);
  const dispatch = useDispatch();

  return (
    <div className="sidebar">
      <h3>Elements</h3>
      {shapes.length === 0 && <p>No elements yet</p>}
      <ul>
        {shapes.map((shape) => (
          <li
            key={shape.id}
            className={selectedId === shape.id ? "selected" : ""}
            onClick={() => dispatch(selectShape(shape.id))}
          >
            {shape.type.toUpperCase()} #{shape.id} — ({shape.x}, {shape.y})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;

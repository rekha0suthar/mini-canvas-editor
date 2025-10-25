import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addRectangle,
  addImage,
  deleteSelected,
  undo,
  redo,
} from "../redux/shapesSlice";
import "../styles/Controls.css";

export default function Controls() {
  const dispatch = useDispatch();
  const selectedId = useSelector((s) => s.shapes.selectedId);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      dispatch(addImage(url));
    } else {
      alert("Please upload a valid image file.");
    }
  };

  return (
    <div className="controls">
      <button onClick={() => dispatch(addRectangle())}>Add Rectangle</button>
      <label className="upload-btn">
        Upload Image
        <input type="file" accept="image/*" hidden onChange={handleImageUpload} />
      </label>
      <button onClick={() => dispatch(undo())}>Undo</button>
      <button onClick={() => dispatch(redo())}>Redo</button>
      <button
        className={selectedId ? "" : "disabled"}
        onClick={() => dispatch(deleteSelected())}
        disabled={!selectedId}
      >
        Delete
      </button>
    </div>
  );
}

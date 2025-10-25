import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addRectangle,
  addImage,
  deleteSelected,
  undo,
  redo,
} from "../slices/shapesSlice";
import "../styles/Controls.css";

export default function Controls() {
  const dispatch = useDispatch();
  const selectedId = useSelector((s) => s.shapes.selectedId);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) {
      alert("Please upload a valid image file.");
      return;
    }
  
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target.result; // permanent base64 string
      dispatch(addImage(dataUrl));
    };
    reader.readAsDataURL(file); // ✅ converts image to base64
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

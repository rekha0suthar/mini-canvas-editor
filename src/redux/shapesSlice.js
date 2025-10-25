import { createSlice } from "@reduxjs/toolkit";

let idCounter = 1;

const shapesSlice = createSlice({
  name: "shapes",
  initialState: {
    items: [],
    selectedId: null,
    history: [],
    historyIndex: -1,
  },
  reducers: {
    addRectangle: (state) => {
      state.items.push({
        id: idCounter++,
        type: "rectangle",
        x: 50,
        y: 50,
        width: 100,
        height: 100,
        fill: "#4F46E5",
      });
    },
    addImage: (state, action) => {
      state.items.push({
        id: idCounter++,
        type: "image",
        x: 80,
        y: 80,
        width: 150,
        height: 100,
        src: action.payload,
      });
    },
    updateShape: (state, action) => {
      const { id, updates } = action.payload;
      const shape = state.items.find((s) => s.id === id);
      if (shape) Object.assign(shape, updates);
    },
    deleteSelected: (state) => {
      if (!state.selectedId) return;
      state.items = state.items.filter((s) => s.id !== state.selectedId);
      state.selectedId = null;
    },
    selectShape: (state, action) => {
      state.selectedId = action.payload;
    },
  },
});

export const {
  addRectangle,
  addImage,
  updateShape,
  deleteSelected,
  selectShape,
} = shapesSlice.actions;

export default shapesSlice.reducer;

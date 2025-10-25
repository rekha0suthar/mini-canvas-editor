import { createSlice } from "@reduxjs/toolkit";

let idCounter = 1;

const loadInitialState = () => {
  try {
    const data = localStorage.getItem("layoutState");
    if (data) return JSON.parse(data);
  } catch (err) {
    console.warn("Failed to load layout:", err);
  }
  return { items: [], selectedId: null, past: [], future: [] };
};

const saveToLocalStorage = (state) => {
  const { items } = state;
  localStorage.setItem("layoutState", JSON.stringify({ ...state, items }));
};

const shapesSlice = createSlice({
  name: "shapes",
  initialState: loadInitialState(),
  reducers: {
    // =============== SHAPE ACTIONS ===============
    addRectangle: (state) => {
      state.past.push(JSON.parse(JSON.stringify(state.items)));
      state.future = [];
      state.items.push({
        id: idCounter++,
        type: "rectangle",
        x: 50,
        y: 50,
        width: 100,
        height: 100,
        fill: "#4F46E5",
      });
      saveToLocalStorage(state);
    },

    addImage: (state, action) => {
      state.past.push(JSON.parse(JSON.stringify(state.items)));
      state.future = [];
      state.items.push({
        id: idCounter++,
        type: "image",
        x: 80,
        y: 80,
        width: 150,
        height: 100,
        src: action.payload,
      });
      saveToLocalStorage(state);
    },

    updateShape: (state, action) => {
      const { id, updates } = action.payload;
      const idx = state.items.findIndex((s) => s.id === id);
      if (idx !== -1) {
        state.past.push(JSON.parse(JSON.stringify(state.items)));
        state.future = [];
        state.items[idx] = { ...state.items[idx], ...updates };
        saveToLocalStorage(state);
      }
    },

    deleteSelected: (state) => {
      if (!state.selectedId) return;
      state.past.push(JSON.parse(JSON.stringify(state.items)));
      state.future = [];
      state.items = state.items.filter((s) => s.id !== state.selectedId);
      state.selectedId = null;
      saveToLocalStorage(state);
    },

    selectShape: (state, action) => {
      state.selectedId = action.payload;
    },

    // =============== UNDO / REDO ===============
    undo: (state) => {
      if (state.past.length === 0) return;
      const previous = state.past.pop();
      state.future.unshift(JSON.parse(JSON.stringify(state.items)));
      state.items = previous;
      saveToLocalStorage(state);
    },

    redo: (state) => {
      if (state.future.length === 0) return;
      const next = state.future.shift();
      state.past.push(JSON.parse(JSON.stringify(state.items)));
      state.items = next;
      saveToLocalStorage(state);
    },
  },
});

export const {
  addRectangle,
  addImage,
  updateShape,
  deleteSelected,
  selectShape,
  undo,
  redo,
} = shapesSlice.actions;

export default shapesSlice.reducer;

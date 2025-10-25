## 🧩 Mini Image Layout Editor

A mini React canvas editor that allows users to add, move, resize, and delete rectangles or images on a canvas. The app is built with **React**, **Redux Toolkit**, and **React Konva**, featuring undo/redo, persistent layouts, and a responsive UI.

---

### 🚀 Setup Instructions

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd mini-canvas-editor

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:5173/](http://localhost:5173/) to view the app.

---

### ⚙️ State Management Notes

* **Redux Toolkit** is used for predictable, centralized state management.
* All shapes (rectangles and images) live in `state.shapes.items`.
* Each state change (add, move, resize, delete) updates Redux and is persisted to **LocalStorage**.
* Undo/Redo is handled using two stacks (`past`, `future`), storing deep copies of `items`:

  * `past` → history of previous layouts
  * `future` → redoable states
* Only the **current layout** (`items`) and selection (`selectedId`) are saved in LocalStorage to ensure clean persistence and prevent history bloat.

This structure avoids stale references and guarantees that the Redux store remains serializable.

---

### 🧠 Assumptions & Implementation Details

1. **Canvas Boundaries:**
   Shapes cannot move or resize outside the canvas. Boundary checks are enforced on every drag or transform event.

2. **Single Selection Model:**
   Only one shape can be selected and resized at a time using a Konva Transformer.

3. **Image Handling:**

   * Uploaded images use `URL.createObjectURL()` for fast preview.
   * The `useImage` hook ensures images load fully before rendering to avoid `drawImage` errors.

4. **Undo/Redo:**
   Full layout snapshots are stored in memory (`past`/`future`), providing reliable time-travel without persisting transient history.

5. **LocalStorage Persistence:**

   * On every shape modification, the app saves `{ items, selectedId }`.
   * Layout auto-restores on reload.


6. **UI & Styling:**

   * Fully custom CSS (no frameworks).
   * Subtle shadows, rounded corners, and grid background for a modern feel.
   * Clean separation between `CanvasArea`, `Sidebar`, and `Controls` components.

7. **Error Handling:**
   Invalid image uploads are caught and logged. Deletion is ignored safely if no shape is selected.

---

### 🧩 Bonus Features Implemented

* ✅ Undo/Redo functionality
* ✅ LocalStorage layout persistence
* ✅ Upload custom images
* ✅ Responsive UI for mobile and desktop
* ✅ Drag, resize, and delete interactions
* ✅ Clean, modern look built entirely with custom CSS

---

### 🏗️ Tech Stack

* **React 19**
* **Redux Toolkit**
* **React Konva**
* **use-image** (Konva image loader)
* **Custom CSS (no frameworks)**

---

### 📁 Project Structure

```
src/
├── components/
│   ├── CanvasArea.js
│   ├── Sidebar.js
│   ├── Controls.js
├── styles/
│   ├── CanvasArea.css
│   ├── Sidebar.css
│   └── Controls.css
├── slices/
│   └── shapesSlice.js
├── App.jsx
├── App.css
└── main.jsx
```

---

### 🧑‍💻 Future Improvements

* Multi-select and group transforms
* Rotations
* Export layout as JSON or image
* Zoom and pan
* Snap-to-grid alignment

import React from "react";
import CanvasArea from "./components/CanvasArea";
import Sidebar from "./components/Sidebar";
import Controls from "./components/Controls";
import "./App.css";

export default function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>🧩 Mini Layout Editor</h1>
        <Controls />
      </header>

      <main className="workspace">
        <section className="canvas-wrapper">
          <CanvasArea />
        </section>
        <aside className="sidebar-wrapper">
          <Sidebar />
        </aside>
      </main>
    </div>
  );
}

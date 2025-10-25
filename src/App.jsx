import React from "react";
import CanvasArea from "./components/CanvasArea";
import Sidebar from "./components/Sidebar";
import Controls from "./components/Controls";

const App = () => {
  return (
    <div className="app-container">
      <h2>🖼️ Mini Image Layout Editor</h2>
      <Controls />
      <div className="workspace">
        <CanvasArea />
        <Sidebar />
      </div>
    </div>
  );
};

export default App;

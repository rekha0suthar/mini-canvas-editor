import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./App.css";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import shapesReducer from "./redux/shapesSlice";

const store = configureStore({
  reducer: { shapes: shapesReducer },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

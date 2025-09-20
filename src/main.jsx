import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import Loader from "./components/Loader";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
        <App />
        <Loader />
  </React.StrictMode>
);

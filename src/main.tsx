import ReactDOM from "react-dom/client";
import App from "./App";
import React from "react";
import { ConfirmProvider } from "../dist/index";
import "./style.css";

const defaultOptions = {
  okText: "+1",
  cancelText: "reset",
  components: {
    Title: <h1 style={{ color: "red" }} />
  }
}

const rootElement = document.getElementById('app')
if(rootElement) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(<ConfirmProvider defaultOptions={defaultOptions}><App /></ConfirmProvider>)
}


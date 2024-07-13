import ReactDOM from "react-dom/client";
import App from "./App";
import React from "react";
import { ConfirmProvider } from "../lib/main";
import "./style.css";

const defaultOptions = {
  okText: "はい",
  cancelText: "いいえ",
  components: {
    Title: <h1 style={{ color: "red" }} />
  }
}

const rootElement = document.getElementById('app')
if(rootElement) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(<ConfirmProvider defaultOptions={defaultOptions}><App /></ConfirmProvider>)
}


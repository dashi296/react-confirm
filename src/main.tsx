import ReactDOM from "react-dom/client";
import App from "./App";
import React from "react";
import { ConfirmProvider } from "../lib/main";


const rootElement = document.getElementById('app')
if(rootElement) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(<ConfirmProvider><App /></ConfirmProvider>)
}


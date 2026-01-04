import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./styles/colorpicker.css";

// Force scrollbar styles directly on document
const style = document.createElement('style');
style.textContent = `
  ::-webkit-scrollbar {
    width: 8px !important;
    height: 8px !important;
  }
  ::-webkit-scrollbar-track {
    background: #f1f5f9 !important;
  }
  ::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, #1c61fe 0%, #ff6b3d 50%, #fbca58 100%) !important;
    border-radius: 10px !important;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(180deg, #1450d8 0%, #e55a2d 50%, #e9b840 100%) !important;
  }
  ::-webkit-scrollbar-button {
    display: none !important;
    width: 0 !important;
    height: 0 !important;
  }
  ::-webkit-scrollbar-corner {
    background: transparent !important;
  }
  html, body, * {
    scrollbar-width: thin !important;
    scrollbar-color: #ff6b3d #f1f5f9 !important;
  }
`;
document.head.appendChild(style);

createRoot(document.getElementById("root")!).render(<App />);

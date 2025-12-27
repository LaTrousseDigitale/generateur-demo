import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./styles/colorpicker.css";
import "./styles/scrollbar.css"; // MUST BE LAST for scrollbar priority

createRoot(document.getElementById("root")!).render(<App />);

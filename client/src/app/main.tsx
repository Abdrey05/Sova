import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./styles/index.css";
import App from "./App.tsx";
import { AlertProvider } from "@/features/alert/index.ts";
import { TaskProvider } from "@/entities/task/index.ts";
import { Provider } from "react-redux";


createRoot(document.getElementById("root")!).render(
  <Provider >
    <BrowserRouter>
      <AlertProvider>
        <TaskProvider>
          <App />
        </TaskProvider>
      </AlertProvider>
    </BrowserRouter>
  </Provider>
);

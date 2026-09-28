import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./styles/index.css";
import App from "./App.tsx";
import { AlertProvider } from "@/features/alert/index.ts";
import { TaskProvider } from "@/entities/task/index.ts";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";


createRoot(document.getElementById("root")!).render(
  <Provider store={store} >
    <BrowserRouter>
      <AlertProvider>
        <TaskProvider>
          <App />
        </TaskProvider>
      </AlertProvider>
    </BrowserRouter>
  </Provider>
);

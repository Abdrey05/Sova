import { createContext } from "react";
import type { TaskContextType } from "../model";

export const TaskContext = createContext<TaskContextType | undefined>(
  undefined
);

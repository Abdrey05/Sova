import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import type { TaskContextType } from "../model";

export function useTasks(): TaskContextType {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within an TaskProvider");
  }
  return context;
}

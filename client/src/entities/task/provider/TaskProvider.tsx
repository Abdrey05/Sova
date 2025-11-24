import { useCallback, useReducer } from "react";
import { taskReducer } from "../reducer/TaskReducer";
import {
  initialTaskState,
  type NewTaskType,
  type TaskContextType,
} from "../model";
import { TaskContext } from "../context/TaskContext";
import TaskApi from "../api/TaskApi";

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState);

  const fetchTasks = useCallback(async () => {
    dispatch({ type: "SET_LOADING", payload: { loading: true } });
    try {
      const { statusCode, data, error } = await TaskApi.getAllTasks();
      if (error) {
        dispatch({ type: "SET_LOADING", payload: { loading: false } });
        dispatch({ type: "SET_ERROR", payload: { error: error } });
        return;
      }
      if (statusCode === 200 && data) {
        dispatch({ type: "SET_LOADING", payload: { loading: false } });
        dispatch({ type: "SET_TASKS", payload: data });
      }
    } catch {
      dispatch({
        type: "SET_ERROR",
        payload: { error: "Ошибка при загрузке задач" },
      });
      dispatch({ type: "SET_LOADING", payload: { loading: false } });
    }
  }, []);

  const fetchTask = useCallback(async (id: number) => {
    dispatch({ type: "SET_LOADING", payload: { loading: true } });
    try {
      const { statusCode, data, error } = await TaskApi.getOneTask(id);
      if (error) {
        dispatch({ type: "SET_LOADING", payload: { loading: false } });
        dispatch({ type: "SET_ERROR", payload: { error: error } });
        return;
      }
      if (statusCode === 200 && data) {
        dispatch({ type: "SET_LOADING", payload: { loading: false } });
        dispatch({ type: "SET_CURRENT_TASK", payload: data });
      }
    } catch {
      dispatch({
        type: "SET_ERROR",
        payload: { error: "Ошибка при загрузке задачи" },
      });
      dispatch({ type: "SET_LOADING", payload: { loading: false } });
    }
  }, []);

  const createTask = useCallback(async (task: NewTaskType) => {
    dispatch({ type: "SET_LOADING", payload: { loading: true } });
    try {
      const { statusCode, data, error } = await TaskApi.createTask(task);
      if (error) {
        dispatch({ type: "SET_LOADING", payload: { loading: false } });
        dispatch({ type: "SET_ERROR", payload: { error: error } });
        return;
      }
      if (statusCode === 201 && data) {
        dispatch({ type: "SET_LOADING", payload: { loading: false } });
        dispatch({ type: "ADD_TASK", payload: data });
      }
    } catch {
      dispatch({
        type: "SET_ERROR",
        payload: { error: "Ошибка при добавлении задачи" },
      });
      dispatch({ type: "SET_LOADING", payload: { loading: false } });
    }
  }, []);

  const updateTask = useCallback(async (taskId: number, task: NewTaskType) => {
    dispatch({ type: "SET_LOADING", payload: { loading: true } });
    try {
      const { statusCode, data, error } = await TaskApi.updateTask(
        taskId,
        task
      );
      if (error) {
        dispatch({ type: "SET_LOADING", payload: { loading: false } });
        dispatch({ type: "SET_ERROR", payload: { error: error } });
        return;
      }
      if (statusCode === 200 && data) {
        dispatch({ type: "SET_LOADING", payload: { loading: false } });
        dispatch({ type: "UPDATE_TASK", payload: data });
      }
    } catch {
      dispatch({
        type: "SET_ERROR",
        payload: { error: "Ошибка при обновлении задачи" },
      });
      dispatch({ type: "SET_LOADING", payload: { loading: false } });
    }
  }, []);

  const deleteTask = useCallback(async (taskId: number) => {
    dispatch({ type: "SET_LOADING", payload: { loading: true } });
    try {
      const { statusCode, error } = await TaskApi.deleteTask(taskId);
      if (error) {
        dispatch({ type: "SET_LOADING", payload: { loading: false } });
        dispatch({ type: "SET_ERROR", payload: { error: error } });
        return;
      }
      if (statusCode === 200) {
        dispatch({ type: "SET_LOADING", payload: { loading: false } });
        dispatch({ type: "DELETE_TASK", payload: { id: taskId } });
      }
    } catch {
      dispatch({
        type: "SET_ERROR",
        payload: { error: "Ошибка при удалении задачи" },
      });
      dispatch({ type: "SET_LOADING", payload: { loading: false } });
    }
  }, []);

  const clearCurrentTask = useCallback(() => {
    dispatch({ type: "CLEAR_CURRENT_TASK" });
  }, []);

  const clearError = useCallback(() => {
    dispatch({ type: "CLEAR_ERROR" });
  }, []);

  const contextValue: TaskContextType = {
    state,
    dispatch,
    fetchTasks,
    fetchTask,
    createTask,
    updateTask,
    deleteTask,
    clearCurrentTask,
    clearError,
  };

  return (
    <TaskContext.Provider value={contextValue}>{children}</TaskContext.Provider>
  );
}

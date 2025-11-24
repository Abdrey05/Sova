import type { TaskActionType, TaskStateType } from "../model";

export function taskReducer(
  state: TaskStateType,
  action: TaskActionType
): TaskStateType {
  switch (action.type) {
    case "SET_ERROR":
      return { ...state, error: action.payload.error };

    case "CLEAR_ERROR":
      return { ...state, error: null };

    case "SET_LOADING":
      return { ...state, loading: action.payload.loading };

    case "SET_TASKS":
      return { ...state, tasks: action.payload };

    case "SET_CURRENT_TASK":
      return { ...state, currentTask: action.payload };

    case "CLEAR_CURRENT_TASK":
      return { ...state, currentTask: null };

    case "ADD_TASK":
      return { ...state, tasks: [...state.tasks, action.payload] };

    case "UPDATE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ),
      };

    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload.id),
      };

    default:
      return state;
  }
}

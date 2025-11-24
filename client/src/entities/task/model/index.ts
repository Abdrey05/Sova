// Тип для новой задачи
export type NewTaskType = {
  title: string;
  text: string;
};

// Тип для  задачи с бэкенда
export type TaskType = {
  id: number;
  title: string;
  text: string;
  user_id: number;
  createdAt: string;
  updatedAt: string;
};

// Тип для массива задач (описаны выше) с бэкенда
export type TaskArrayType = TaskType[];

export type TaskStateType = {
  tasks: TaskArrayType;
  currentTask: TaskType | null;
  error: string | null;
  loading: boolean;
};

export type TaskActionType =
  | { type: "SET_ERROR"; payload: { error: string } }
  | { type: "CLEAR_ERROR" }
  | { type: "SET_LOADING"; payload: { loading: boolean } }
  | { type: "SET_TASKS"; payload: TaskArrayType }
  | { type: "SET_CURRENT_TASK"; payload: TaskType }
  | { type: "CLEAR_CURRENT_TASK" }
  | { type: "ADD_TASK"; payload: TaskType }
  | { type: "UPDATE_TASK"; payload: TaskType }
  | { type: "DELETE_TASK"; payload: { id: number } };

export type TaskContextType = {
  state: TaskStateType;
  dispatch: React.Dispatch<TaskActionType>;
  fetchTasks: () => Promise<void>;
  fetchTask: (id: number) => Promise<void>;
  createTask: (task: NewTaskType) => Promise<void>;
  updateTask: (taskId: number, task: NewTaskType) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
  clearCurrentTask: () => void;
  clearError: () => void;
};

export const initialTaskState: TaskStateType = {
  tasks: [],
  currentTask: null,
  error: null,
  loading: false,
};

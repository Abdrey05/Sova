import { useEffect, useState } from "react";
import "./TasksPage.css";
import TaskCard from "@/entities/task/ui/TaskCard/TaskCard";
import { useAlerts } from "@/features/alert";
import { useTasks } from "@/entities/task";
import TaskForm from "@/entities/task/ui/TaskForm/TaskForm";

export default function TasksPage() {
  const { state, fetchTasks } = useTasks();
  const { tasks, error } = state;
  const { dispatch: alertDispatch } = useAlerts();
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    if (error) {
      alertDispatch({
        type: "SHOW_ERROR",
        payload: { message: error },
      });
    }
  }, [error]);

  return (
    <div className="app-container">
      <div className="todo-container">
        <TaskForm />
        <button onClick={() => setCounter(counter + 1)}>Increment</button>
        <p>Counter: {counter}</p>
        <div className="tasks-container">
          {tasks.length > 0
            ? tasks.map((task) => <TaskCard task={task} key={task.id} />)
            : "Список задач пуст"}
        </div>
      </div>
    </div>
  );
}

import { useNavigate, useParams } from "react-router";
import "./OneTaskPage.css";
import { useEffect } from "react";
import { useTasks } from "@/entities/task";
import Button from "@/shared/ui/Button";

export default function OneTaskPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { state, fetchTask, clearCurrentTask } = useTasks();

  const { currentTask, error } = state;

  useEffect(() => {
    fetchTask(Number(id));

    return () => {
      clearCurrentTask();
    };
  }, []);

  return (
    <>
      <div className="app-container">
        {error ? (
          <h2 style={{ color: "red" }}>{error}</h2>
        ) : (
          currentTask && (
            <>
              <h1>Страница задачи {id}</h1>
              <div className="task">
                <h2 className="task-name">{currentTask.title}</h2>
                <div className="task-content">
                  <p className="task-text">{currentTask.text}</p>
                </div>
              </div>
              <Button
                size="small"
                variant="secondary"
                className="back-navigation-button"
                onClick={() => navigate(-1)}
              >
                Назад
              </Button>
            </>
          )
        )}
      </div>
    </>
  );
}

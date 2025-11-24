import { useNavigate } from "react-router";
import "./TaskCard.css";
import { Trash, ChevronRight, Pencil, X, Check } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import type { TaskType } from "@/entities/task/model";
import { useTasks } from "../../hooks/useTasks";
import { useAlerts } from "@/features/alert";
import { useAppSelector } from "@/shared/hooks/useReduxHooks";

type TaskComponentPropsType = {
  task: TaskType;
};

function TaskCard({ task }: TaskComponentPropsType) {
  const navigate = useNavigate();

  const { user } = useAppSelector((state) => state.user);
  const [isEditing, setIsEditing] = useState(false);

  const [editedTask, setEditedTask] = useState({
    title: task.title,
    text: task.text,
  });

  const { dispatch: alertDispatch } = useAlerts();

  const { updateTask, deleteTask, state } = useTasks();
  const { error } = state;

  const inputHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEditedTask((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const formattedDate = useMemo(() => {
    console.log(`вычисляю дату заново для задачи ${task.id}`)
    return new Date(task.createdAt).toLocaleString("ru-RU");
  }, [task.createdAt]);

  const updateTaskHandler = async (id: number) => {
    await updateTask(id, editedTask);
    setIsEditing(false);
    setEditedTask({ title: editedTask.title, text: editedTask.text });
  };

  const deleteTaskHandler = async (id: number) => {
    await deleteTask(id);
  };

  useEffect(() => {
    if (error) {
      alertDispatch({
        type: "SHOW_ERROR",
        payload: { message: error },
      });
    }
  }, [error]);

  return (
    <div className="task">
      <div className="task-title">
        {isEditing ? (
          <input
            type="text"
            name="title"
            className="task-title-input"
            value={editedTask.title}
            onChange={inputHandler}
          />
        ) : (
          <h2 className="task-name">{task.title}</h2>
        )}
        <small>Добавлено: {formattedDate}</small>
      </div>

      <div className="task-content">
        {isEditing ? (
          <textarea
            rows={2}
            cols={55}
            name="text"
            className="task-text-input"
            value={editedTask.text}
            onChange={inputHandler}
          />
        ) : (
          <p className="task-text">{task.text}</p>
        )}
        {user?.id === task.user_id && (
          <div className="task-controls">
            {isEditing ? (
              <>
                <button
                  className="task-control-button save-task-button"
                  title="Сохранить"
                  onClick={() => updateTaskHandler(task.id)}
                >
                  <Check color="white" />
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setEditedTask(task);
                  }}
                  className="task-control-button delete-task-button"
                  title="Отменить"
                >
                  <X color="white" />
                </button>
              </>
            ) : (
              <button
                className="edit-task-button task-control-button"
                title="Редактировать"
                onClick={() => setIsEditing(true)}
              >
                <Pencil color="white" />
              </button>
            )}

            <button
              className="delete-task-button task-control-button"
              onClick={() => deleteTaskHandler(task.id)}
              title="Удалить"
            >
              <Trash color="white" />
            </button>
            <button
              className="task-control-button details-button"
              onClick={() => navigate(`/tasks/${task.id}`)}
              title="Подробнее"
            >
              <ChevronRight />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default React.memo(TaskCard);

import { useForm } from "react-hook-form";
import "./TaskForm.css";
import {
  taskValidationSchema,
  type TaskValidationSchema,
} from "../../validation/validator";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTasks } from "../../hooks/useTasks";
import { useAlerts } from "@/features/alert";
import Button from "@/shared/ui/Button";
import Loader from "@/shared/ui/Loader/Loader";

export default function TaskForm() {
  const {
    createTask,
    state: { loading },
  } = useTasks();
  const { dispatch: alertDispatch } = useAlerts();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
  } = useForm<TaskValidationSchema>({
    resolver: yupResolver(taskValidationSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      text: "",
    },
  });

  const watchedTitle = watch("title");
  const watchedText = watch("text");

  const addTask = async (data: TaskValidationSchema) => {
    await createTask(data);
    reset();
    alertDispatch({
      type: "SHOW_SUCCESS",
      payload: { message: "Задача добавлена успешно" },
    });
  };

  return (
    <form onSubmit={handleSubmit(addTask)} className="task-form">
      {watchedTitle && <p>{watchedTitle.length} / 100</p>}
      <input {...register("title")} placeholder="Название задачи" />
      {errors.title && <p>{errors.title.message}</p>}
      {watchedText && <p>{watchedText.length} / 100</p>}
      <input {...register("text")} placeholder="Описание задачи" />
      {errors.text && <p>{errors.text.message}</p>}
      <Button size="small" type="submit" disabled={loading || !isValid}>
        <span>{loading ? "Добавление" : "Добавить"}</span>
        {loading ? <Loader /> : null}
      </Button>
    </form>
  );
}

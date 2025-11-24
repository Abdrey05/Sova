// Модель данных для уведомлений

export type AlertStatusType = "success" | "error" | "warning" | "info"; // Типы статусов уведомлений

export type AlertType = { // Тип уведомления
  id: number; // Идентификатор уведомления
  message: string; // Текст уведомления
  status: AlertStatusType; // Статус уведомления
};
// Тип действия над уведомлениями
export type AlertActionType = 
  | {
      type: "SHOW_SUCCESS";
      payload: { message: string };
    }
  | { type: "SHOW_ERROR"; payload: { message: string } }
  | { type: "SHOW_WARNING"; payload: { message: string } }
  | { type: "SHOW_INFO"; payload: { message: string } }
  | { type: "CLEAR_ALERT"; payload: { id: number } }
  | { type: "CLEAR_ALL_ALERTS" };

export type AlertStateType = {
  alerts: AlertType[];
};

// Типизация контекста для работы с уведомлениями
export type AlertContextType = {
  alerts: AlertType[];
  dispatch: React.Dispatch<AlertActionType>;
};
// Начальное состояние контекста для работы с уведомлениями
export const initialState: AlertStateType = {
  alerts: [],
};


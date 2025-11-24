import { useReducer } from "react";
import {
  initialState,
  type AlertActionType,
  type AlertStateType,
} from "../model";
import { AlertContext } from "../context/AlertContext";

// Редюсер для работы с уведомлениями (функция, которая принимает текущее состояние и действие(action) и возвращает новое состояние)

function alertReducer(
  state: AlertStateType,
  action: AlertActionType
): AlertStateType {
  switch (
    action.type // в зависимости от типа действия, возвращаем новое состояние
  ) {
    case "SHOW_SUCCESS":
      return {
        ...state,
        alerts: [
          ...state.alerts,
          {
            id: Date.now(),
            message: action.payload.message,
            status: "success",
          },
        ],
      };
    case "SHOW_ERROR":
      return {
        ...state,
        alerts: [
          ...state.alerts,
          {
            id: Date.now(),
            message: action.payload.message,
            status: "error",
          },
        ],
      };
    case "SHOW_WARNING":
      return {
        ...state,
        alerts: [
          ...state.alerts,
          {
            id: Date.now(),
            message: action.payload.message,
            status: "warning",
          },
        ],
      };
    case "SHOW_INFO":
      return {
        ...state,
        alerts: [
          ...state.alerts,
          {
            id: Date.now(),
            message: action.payload.message,
            status: "info",
          },
        ],
      };

    case "CLEAR_ALERT": {
      return {
        ...state,
        alerts: state.alerts.filter((alert) => alert.id !== action.payload.id),
      };
    }
    case "CLEAR_ALL_ALERTS": {
      return { ...state, alerts: [] };
    }

    default:
      return state;
  }
}

// Компонент для работы с уведомлениями (обертка-провайдер для контекста, позволяет children получить доступ к данным в контексте и функции dispatch для отправки действий для изменения состояния)

export default function AlertProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(alertReducer, initialState);

  return (
    <AlertContext.Provider value={{ alerts: state.alerts, dispatch }}>
      {children}
    </AlertContext.Provider>
  );
}

import { useContext } from "react";
import { AlertContext } from "../context/AlertContext";

// Кастомный хук для работы с уведомлениями

export function useAlerts() {
  const context = useContext(AlertContext); // Используем встроенный хук useContext для получения контекста
  if (!context) {
    throw new Error("useAlerts must be used within an AlertProvider"); // Если контекст не найден, выбрасываем ошибку
  }
  return context; // Возвращаем контекст
}

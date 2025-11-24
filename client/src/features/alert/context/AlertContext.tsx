import { createContext } from "react";
import type { AlertContextType } from "../model";

// Создаем контекст для работы с уведомлениями (встроенная в React функция createContext)

export const AlertContext = createContext<AlertContextType | undefined>(
  undefined
);

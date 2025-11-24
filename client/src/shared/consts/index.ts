import type { ServerResponseType } from "../types";

export const defaultAxiosError: ServerResponseType<null> = {
  statusCode: 500,
  message: "Неизвестная ошибка",
  data: null,
  error: "Неизвестная ошибка",
};

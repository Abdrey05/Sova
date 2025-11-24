import * as yup from "yup";

const FORBIDDEN_WORDS = ["отдых", "спать", "поесть", "попить"];

const noWhitespace = (value: string) => {
  return value ? value.trim().length > 0 : false;
};

const noForbiddenWords = (value: string) => {
  return value
    ? !FORBIDDEN_WORDS.some((word) => value.toLowerCase().includes(word))
    : true;
};

export const taskValidationSchema = yup.object().shape({
  title: yup
    .string()
    .required("Введите название задачи")
    .test(
      "no-whitespace",
      "Название задачи не может содержать пробелы",
      noWhitespace
    )
    .test(
      "no-forbidden-words",
      "Название задачи не может содержать запрещенные слова",
      noForbiddenWords
    )
    .trim(),
  text: yup
    .string()
    .required("Введите описание задачи")
    .test(
      "no-whitespace",
      "Описание задачи не может содержать пробелы",
      noWhitespace
    )
    .test(
      "no-forbidden-words",
      "Описание задачи не может содержать запрещенные слова",
      noForbiddenWords
    )
    .trim(),
});

export type TaskValidationSchema = yup.InferType<typeof taskValidationSchema>;

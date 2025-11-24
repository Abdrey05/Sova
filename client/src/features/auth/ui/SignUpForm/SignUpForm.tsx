import { useState } from "react";
import { useNavigate } from "react-router";
import "./SignUpForm.css";
import { UserValidator } from "@/entities/user/validation/UserValidator";
import { signUpThunk } from "@/entities/user/api/UserApi";
import FormInput from "@/shared/ui/FormInput/FormInput";
import { useAlerts } from "@/features/alert";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/useReduxHooks";
import { AxiosError } from "axios";

export default function SignUpForm() {
  // начальные значения формы
  const initialValue = { username: "", email: "", password: "" };

  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.user);

  const navigate = useNavigate();

  const { dispatch: alertsDispatch } = useAlerts();

  // состояние формы
  const [signUpData, setSignUpData] = useState(initialValue);
  // обработчик изменения значений формы
  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const signUpHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { isValid, error: validationError } =
      UserValidator.validateSignUpData(signUpData);

    if (!isValid) {
      alertsDispatch({
        type: "SHOW_ERROR",
        payload: { message: validationError || "Ошибка валидации" },
      });
      return;
    }
    try {
      const result = await dispatch(signUpThunk(signUpData)).unwrap();
      alertsDispatch({
        type: "SHOW_SUCCESS",
        payload: {
          message: "Регистрация успешна, добро пожаловать, " + result.username,
        },
      });

      setSignUpData(initialValue);
      navigate("/tasks");
    } catch (error) {
      if (error instanceof AxiosError) {
        alertsDispatch({
          type: "SHOW_ERROR",
          payload: { message: error.message || "Ошибка при регистрации" },
        });
      }
    }
  };

  return (
    <div>
      <form className="form" onSubmit={signUpHandler}>
        <FormInput
          placeholder=" "
          name="username"
          type="text"
          required
          onChange={inputHandler}
          value={signUpData.username}
          label="Имя"
        />
        <FormInput
          placeholder=" "
          name="email"
          type="email"
          required
          onChange={inputHandler}
          value={signUpData.email}
          label="Почта"
        />
        <FormInput
          placeholder=" "
          name="password"
          type="password"
          required
          onChange={inputHandler}
          value={signUpData.password}
          label="Пароль"
        />
        <button className="form-action-button" disabled={isLoading}>
          {isLoading ? "Регистрация..." : "Зарегистрироваться"}
        </button>
      </form>
    </div>
  );
}

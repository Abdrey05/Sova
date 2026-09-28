import {  useState } from "react";
import { useNavigate } from "react-router";
import "./SignInForm.css";
import { UserValidator } from "@/entities/user/validation/UserValidator";
import { signInThunk } from "@/entities/user/api/UserApi";
import FormInput from "@/shared/ui/FormInput/FormInput";
import type { UserSignInDataType } from "@/entities/user/model";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/useReduxHooks";
import { useAlerts } from "@/features/alert";
import { AxiosError } from "axios";

export default function SignInForm() {
  const initialValue: UserSignInDataType = { email: "", password: "" };
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { dispatch: alertsDispatch } = useAlerts();
  const {  isLoading } = useAppSelector((state) => state.user);

  const [signInData, setSignInData] = useState(initialValue);

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignInData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const signInHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { isValid, error: validationError } =
      UserValidator.validateSignInData(signInData);

    if (!isValid) {
      alertsDispatch({
        type: "SHOW_ERROR",
        payload: { message: validationError || "Ошибка валидации" },
      });
      return;
    }
    try {
      const result = await dispatch(signInThunk(signInData)).unwrap();
      alertsDispatch({
        type: "SHOW_SUCCESS",
        payload: {
          message: "Вход успешен, добро пожаловать, " + result.username,
        },
      });
      setSignInData(initialValue);
      navigate("/tasks");
    } catch (error) {
      if (error instanceof AxiosError) {
        alertsDispatch({
          type: "SHOW_ERROR",
          payload: { message: error.message || "Ошибка при входе" },
        });
      }
    }
  };


  return (
    <div>
      <form className="form" onSubmit={signInHandler}>
        <FormInput
          placeholder=" "
          name="email"
          type="email"
          required
          onChange={inputHandler}
          value={signInData.email}
          label="Почта"
        />
        <FormInput
          placeholder=" "
          name="password"
          type="password"
          required
          onChange={inputHandler}
          value={signInData.password}
          label="Пароль"
        />
        <button className="form-action-button" disabled={isLoading}>
          {isLoading ? "Вход..." : "Войти"}
        </button>
      </form>
    </div>
  );
}

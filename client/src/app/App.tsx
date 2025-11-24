import { useEffect } from "react";
import "./styles/App.css";
import { refreshTokensThunk } from "@/entities/user/api/UserApi";
import AppRouter from "@/app/routing/AppRouter";
import { useAppDispatch } from "@/shared/hooks/useReduxHooks";

function App() {
  // получаем dispatch из кастомного хука useAppDispatch
  const dispatch = useAppDispatch();

  useEffect(() => {
    // вызываем thunk для обновления токенов и автоматической реаутентификации пользователя
    dispatch(refreshTokensThunk());
  }, []);

  return <AppRouter />;
}

export default App;

import "./Header.css";
import { NavLink, Link, useNavigate } from "react-router";
import { signOutThunk } from "@/entities/user/api/UserApi";
import { useAppDispatch, useAppSelector} from "@/shared/hooks/useReduxHooks";
import { useAlerts } from "@/features/alert";
import { CLIENT_ROUTES } from "@/shared/enums/clientRoutes";
import { useEffect } from "react";
// import { useSelector } from "react-redux";

export default function Header() {
  const { user, error } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const { dispatch: alertsDispatch } = useAlerts();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      alertsDispatch({
        type: "SHOW_ERROR",
        payload: { message: error },
      });
    }
  }, [error]);

  async function handleSignOut() {
    await dispatch(signOutThunk()).unwrap();
    alertsDispatch({
      type: "SHOW_INFO",
      payload: { message: "Вы успешно вышли из аккаунта" },
    });
    navigate(CLIENT_ROUTES.AUTH);
  }

  return (
    <header>
      <nav>
        <NavLink className="navlink" to="/">
          Главная
        </NavLink>
        <NavLink className="navlink" to="/tasks">
          Задачи
        </NavLink>
        <NavLink className="navlink" to="/counter">
          Счётчики
        </NavLink>
        <NavLink className="navlink" to="/timer">
          Таймер
        </NavLink>
      </nav>
      <div className="user-control">
        {user ? (
          <>
            <Link className="navlink" to="/">
              {user?.username}
            </Link>
            <Link className="navlink" to="/auth" onClick={handleSignOut}>
              Выход
            </Link>
          </>
        ) : (
          <Link className="navlink" to="/auth">
            Вход
          </Link>
        )}
      </div>
    </header>
  );
}

import "./AuthPage.css";
import SignUpForm from "@/features/auth/ui/SignUpForm/SignUpForm";
import SignInForm from "@/features/auth/ui/SignInForm/SignInForm";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

export default function AuthPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const formParam = searchParams.get("form");
  const [isSignUp, setIsSignUp] = useState(formParam === "signup");

  useEffect(() => {
    if (isSignUp && formParam !== "signup") {
      setSearchParams({ form: "signup" }, { replace: true });
    } else if (!isSignUp && formParam !== "signin") {
      setSearchParams({ form: "signin" }, { replace: true });
    }
  }, [isSignUp, formParam, setSearchParams]);

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div className="app-container">
      <div className="form-container">
        {isSignUp ? <SignUpForm /> : <SignInForm />}
        {isSignUp ? (
          <>
            <p>Уже есть учетная запись?</p>
            <span className="auth-link" onClick={toggleForm}>
              Войти
            </span>
          </>
        ) : (
          <>
            <p>Еще нет учетной записи?</p>
            <span className="auth-link" onClick={toggleForm}>
              Создать
            </span>
          </>
        )}
      </div>
    </div>
  );
}

import { useAppSelector } from "@/shared/hooks/useReduxHooks";
import { Navigate } from "react-router";
import { CLIENT_ROUTES } from "@/shared/enums/clientRoutes";

export default function PublicGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isInitialized, isLoading } = useAppSelector(
    (state) => state.user
  );

  if (isLoading || !isInitialized) {
    return <div>Загрузка...</div>;
  }

  if (user) {
    return <Navigate to={CLIENT_ROUTES.HOME} replace />;
  }

  return children;
}

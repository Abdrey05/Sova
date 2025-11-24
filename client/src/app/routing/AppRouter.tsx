import { Routes, Route } from "react-router";
import Layout from "../Layout/Layout";
import { AuthPage, MainPage, OneTaskPage, TasksPage, TimerPage } from "@/pages";
import { CLIENT_ROUTES } from "@/shared/enums/clientRoutes";
import AuthGuard from "./guards/AuthGuard";
import PublicGuard from "./guards/PublicGuard";
import { lazy, Suspense } from "react";
import Spinner from "@/shared/ui/Spinner/Spinner";

const CounterPage = lazy(() => import("@/pages/CounterPage/CounterPage"));

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path={CLIENT_ROUTES.HOME} element={<MainPage />} />
        <Route
          path={CLIENT_ROUTES.COUNTERS}
          element={
            <Suspense fallback={<Spinner />}>
              <CounterPage />
            </Suspense>
          }
        />
        <Route path={CLIENT_ROUTES.TIMER} element={<TimerPage />} />
        <Route
          path={CLIENT_ROUTES.TASKS}
          element={
            <AuthGuard>
              <TasksPage />
            </AuthGuard>
          }
        />
        <Route path={CLIENT_ROUTES.TASKS + "/:id"} element={<OneTaskPage />} />
        <Route
          path={CLIENT_ROUTES.AUTH}
          element={
            <PublicGuard>
              <AuthPage />
            </PublicGuard>
          }
        />
      </Route>
    </Routes>
  );
}

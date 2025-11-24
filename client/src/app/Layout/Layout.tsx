import { Outlet } from "react-router";
import "./Layout.css";
import Header from "@/widgets/Header/Header";
import { AlertContainer } from "@/features/alert";

import useWindowWidth from "@/shared/hooks/useWindowWidth";

export default function Layout() {
  const { isDesktop } = useWindowWidth();
  return (
    <>
      {isDesktop ? (
        <div className="layout">
          <AlertContainer />
          <Header />
          <div className="layout-content">
            <Outlet />
          </div>
          <footer>Footer</footer>
        </div>
      ) : (
        <h3>Поддерживается только десктоп версия</h3>
      )}
    </>
  );
}

import * as React from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "../../components/header/Header";
import { RootState } from "../../store";

function Layout() {
  const isLoggedIn = useSelector(
    (state: RootState) => state.user.user.isLoggedIn
  );

  const isError = useSelector((state: RootState) => state.error.errors);

  return (
    <div>
      {isLoggedIn ? <Header /> : null}
      {isError.length ? <Outlet /> : <Outlet />}
    </div>
  );
}

export default Layout;

import Header from "../../components/header/Header";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

function Layout() {
  const isLoggedIn = useSelector(
    (state: RootState) => state.user.user.isLoggedIn
  );
  return (
    <>
      {isLoggedIn && <Header />}
      <Outlet />
    </>
  );
}

export default Layout;

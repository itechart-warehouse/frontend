import Header from "../../components/header/Header";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import ModalWindow from "../../components/modal/ModalWindow";
import NotFoundPage from "../not-found/NotFoundPage";
import { Alert } from "@mui/material";

function Layout() {
  const isLoggedIn = useSelector(
    (state: RootState) => state.user.user.isLoggedIn
  );

  const isError = useSelector((state: RootState) => state.error.errors);

  return (
    <>
      {isLoggedIn ? <Header /> : null}

      {isError.length ? (
        <>
          {/*<ModalWindow isOpen={true} />*/}
          <Outlet />
          {/*<Outlet />*/}
          {/*<ModalWindow isOpen={true} />*/}
          {/*<NotFoundPage />*/}
        </>
      ) : (
        <Outlet />
      )}
    </>
  );
}

export default Layout;

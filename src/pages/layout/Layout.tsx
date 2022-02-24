import Header from "../../components/header/Header";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import ModalWindow from "../../components/modal/ModalWindow";
import NotFoundPage from "../not-found/NotFoundPage";

function Layout() {
  const isLoggedIn = useSelector(
    (state: RootState) => state.user.user.isLoggedIn
  );

  const isError = useSelector((state: RootState) => state.error);

  return (
    <>
      {isLoggedIn && <Header />}
      {isError.length ? (
        <>
          <ModalWindow isOpen={true} />
          <NotFoundPage />
        </>
      ) : (
        <>
          <ModalWindow isOpen={false} />
          <Outlet />
        </>
      )}
    </>
  );
}

export default Layout;

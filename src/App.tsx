import {Route, Routes, Navigate} from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import "./App.css";
//import RecoverPasswordPage from "./pages/recover-password/RecoverPasswordPage";
import LoginPage from "./pages/login/LoginPage";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import CompanyShowPage from "./pages/company/show-company/CompanyShowPage";
import CompaniesPage from "./pages/company/all-companies/CompaniesPage";
import CreateCompanyPage from "./pages/company/create-company/CreateCompanyPage";
import Layout from "./pages/layout/Layout";
import UsersPage from "./pages/user/all-users/UsersPage";
import EditUserPage from "./pages/user/edit-user/EditUserPage";
import CreateUserPage from "./pages/user/create-user/CreateUserPage";
import EditCompanyPage from "./pages/company/edit-company/EditCompanyPage";
import UserShowPage from "./pages/user/show-user/UserShowPage";
import WarehousesPage from "./pages/warehouse/all-warehouses/WarehousesPage";
import NotFoundPage from "./pages/not-found/NotFoundPage";

function App() {
  const isLoggedIn = useSelector(
    (state: RootState) => state.user.user.isLoggedIn
  );

  return (
    <>
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/" element={<Layout />}>
              <Route index element={<Navigate to="home" />} />
              <Route path="*" element={<NotFoundPage />} />
              <Route path="home" element={<HomePage />} />
              <Route path="company/create" element={<CreateCompanyPage />} />
              <Route path="companies" element={<CompaniesPage />} />
              <Route path="companies/:id" element={<CompanyShowPage />} />
              <Route path="companies/:id/edit" element={<EditCompanyPage />} />
              <Route path="users" element={<UsersPage />} />
              <Route path="users/:id" element={<UserShowPage />} />
              <Route path="users/:id/edit" element={<EditUserPage />} />
              <Route path="user/create" element={<CreateUserPage />} />
                <Route path="companies/:id/warehouses" element={<WarehousesPage />}/>

            </Route>
          </>
        ) : (
          <>
            <Route path="/*" element={<Navigate to="/" />} />
            <Route path="/" element={<Layout />}>
              <Route index element={<LoginPage />} />
            </Route>
            {/*<Route path="/password" element={<RecoverPasswordPage />} />*/}
          </>
        )}
      </Routes>
    </>
  );
}

export default App;

import { Route, Routes, Navigate } from "react-router-dom";
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
              <Route path="home" element={<HomePage />} />
              <Route path="company/create" element={<CreateCompanyPage />} />
              <Route path="companies" element={<CompaniesPage />} />
              <Route path="companies/:id" element={<CompanyShowPage />} />
              <Route path="users" element={<UsersPage />} />
            </Route>
          </>
        ) : (
          <>
            <Route path="/*" element={<Navigate to="/" />} />
            <Route path="/" element={<LoginPage />} />
            {/*<Route path="/password" element={<RecoverPasswordPage />} />*/}
          </>
        )}
      </Routes>
    </>
  );
}

export default App;

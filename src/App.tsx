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
import UsersPage from "./pages/user/all-users/UsersPage";
import EditUserPage from "./pages/user/edit-user/EditUserPage";
import CreateUserPage from "./pages/user/create-user/CreateUserPage";
import EditCompanyPage from "./pages/company/edit-company/EditCompanyPage";
import UserShowPage from "./pages/user/show-user/UserShowPage";
import WarehousesPage from "./pages/warehouse/all-warehouses/WarehousesPage";
import NotFoundPage from "./pages/not-found/NotFoundPage";
import CreateWarehousePage from "./pages/warehouse/create-warehouse/CreateWarehousePage";
import WarehouseShowPage from "./pages/warehouse/show-warehouse/WarehouseShowPage";
// import SectionsPage from "./pages/section/all-sections/SectionsPage";
import EditWarehousePage from "./pages/warehouse/edit-warehouse/EditWarehousePage";
import ConsignmentsPage from "./pages/consignment/all-consignments/ConsignmentsPage";
import ConsignmentShowPage from "./pages/consignment/show-consignment/ConsignmentShowPage";
import DriversPage from "./pages/driver/all-drivers/DriversPage";
import DriverShowPage from "./pages/driver/show-driver/DriverShowPage";
import TransportShowPage from "./pages/transport/show-transport/TransportShowPage";
import AllTransportPage from "./pages/transport/all-transport/AllTransportPage";
import WarehouseConsignmentShowPage from "./pages/consignment/warehouse-show-consignment/WarehouseConsignmentShowPage";
import WarehouseConsignmentsPage from "./pages/consignment/warehouse-all-consignment/WarehouseConsignmentsPage";
import ConsignmentGoodsPage from "./pages/consignment/warehouse-all-consignment/goods/consignment-goods/ConsignmentGoodsPage";
import CreateReportPage from "./pages/report/create-report/CreateReportPage";
import ReportsPage from "./pages/report/all-reports/ReportsPage";
import Layout from "./pages/layout/Layout";

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
              <Route
                path="companies/:id/warehouses"
                element={<WarehousesPage />}
              />
              <Route
                path="companies/:id/warehouses/create"
                element={<CreateWarehousePage />}
              />
              <Route path="warehouse/:id" element={<WarehouseShowPage />} />
              <Route
                path="warehouse/:id/edit"
                element={<EditWarehousePage />}
              />
              <Route path="consignments" element={<ConsignmentsPage />} />
              <Route
                path="consignments/:id"
                element={<ConsignmentShowPage />}
              />
              <Route
                path="warehouse-consignments"
                element={<WarehouseConsignmentsPage />}
              />
              <Route
                path="warehouse-consignments/:id"
                element={<WarehouseConsignmentShowPage />}
              />
              <Route
                path="warehouse-consignments/:id/goods"
                element={<ConsignmentGoodsPage />}
              />
              <Route
                path="warehouse-consignments/:id/reports/create"
                element={<CreateReportPage />}
              />
              <Route path="drivers" element={<DriversPage />} />
              <Route path="drivers/:id" element={<DriverShowPage />} />
              <Route path="transport/:id" element={<TransportShowPage />} />
              <Route path="transports" element={<AllTransportPage />} />
              <Route
                path="warehouse-consignments/:id/reports"
                element={<ReportsPage />}
              />
            </Route>
          </>
        ) : (
          <>
            <Route path="/*" element={<Navigate to="/" />} />
            {/*// <Route path="/" element={<Layout />}>*/}
            <Route index element={<LoginPage />} />
            {/*</Route>*/}
            {/*<Route path="/password" element={<RecoverPasswordPage />} />*/}
          </>
        )}
      </Routes>
    </>
  );
}

export default App;

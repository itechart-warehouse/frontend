import * as React from "react";
import { AppBar, Container, Grid } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { clientApi } from "../../services/clientApi";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/loginSlice";
import { RootState } from "../../store";
import CompanyButton from "./menu-items/CompanyButton";
import UserButton from "./menu-items/UserButton";
import { useNavigate } from "react-router-dom";
import WarehouseButton from "./menu-items/WarehouseButton";
import DriverButton from "./menu-items/DriverButton";
import TransportButton from "./menu-items/TransportButton";
import ConsignmentButton from "./menu-items/ConsignmentButton";
import UserInfo from "./menu-items/UserInfo";
import StatisticsButton from "./menu-items/StatisticsButton";

export default function Header() {
  const dispatch = useDispatch();
  const jwt = useSelector((state: RootState) => state.user.user.jwt);
  const role = useSelector((state: RootState) => state.user.userRole.name);

  const logout = () => {
    clientApi.userData.logout(jwt).then(() => {
      dispatch(logoutUser());
    });
  };

  const navigate = useNavigate();
  const rootRoute = () => {
    navigate("/home");
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Grid container spacing={2}>
            <Grid
              item
              xs={10}
              display="flex"
              alignItems="center"
              justifyContent="flex-start"
            >
              <Typography variant="h4" component="div">
                Warehouse
              </Typography>
              <Button onClick={rootRoute} color="inherit">
                Home
              </Button>
              {role === "System admin" ||
              role === "Company admin" ||
              role === "Company owner" ||
              role === "Warehouse admin" ? (
                <>
                  <CompanyButton />
                  <UserButton />
                </>
              ) : (
                ""
              )}
              {role === "Company admin" || role === "Company owner" ? (
                <>
                  <WarehouseButton />
                </>
              ) : (
                ""
              )}
              <TransportButton />
              <DriverButton />
              <ConsignmentButton />
              <StatisticsButton />
            </Grid>
            <Grid item xs={2} justifyContent="flex-end">
              <UserInfo />
            </Grid>
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

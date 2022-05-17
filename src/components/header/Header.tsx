import * as React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppBar, Container, Grid, Toolbar, Typography, Button } from "@mui/material";
import { RootState } from "../../store";
import CompanyButton from "./menu-items/CompanyButton";
import UserButton from "./menu-items/UserButton";
import WarehouseButton from "./menu-items/WarehouseButton";
import DriverButton from "./menu-items/DriverButton";
import TransportButton from "./menu-items/TransportButton";
import ConsignmentButton from "./menu-items/ConsignmentButton";
import UserInfo from "./menu-items/UserInfo";
import StatisticsButton from "./menu-items/StatisticsButton";

export default function Header() {
  const navigate = useNavigate();
  const role = useSelector((state: RootState) => state.user.userRole.name);
  const rootRoute = () => navigate("/home");

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
              <StatisticsButton/>
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

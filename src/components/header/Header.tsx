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

export default function Header() {
  const dispatch = useDispatch();
  const jwt = useSelector((state: RootState) => state.user.user.jwt);

  const logout = () => {
    clientApi.userData
      .logout(jwt)
      .then(() => {
        dispatch(logoutUser());
      })
      .catch((err) => alert(err));
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
              xs={11}
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
              <CompanyButton />
              <UserButton />
              {/*<WarehouseButton />*/}
              <DriverButton />
            </Grid>
            <Grid item xs={1}>
              <Button onClick={logout} color="info" variant="contained">
                Logout
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

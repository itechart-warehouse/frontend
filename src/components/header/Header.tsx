import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { clientApi } from "../../services/clientApi";
import {useDispatch, useSelector} from "react-redux";
import {logoutUser} from "../../store/loginSlice";
import {RootState} from "../../store";

export default function Header() {
  const dispatch = useDispatch();
  const jwt = useSelector((state: RootState) => state.user.user.jwt);

  const logout = () => {
    clientApi.userData
      .logout(jwt)
      .then((res) => {
        dispatch(logoutUser())
      })
      .catch((err) => alert(err));
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Warehouse
          </Typography>
          <Button onClick={logout} color="inherit">
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

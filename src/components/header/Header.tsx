import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { clientApi } from "../../services/clientApi";
import {useDispatch} from "react-redux";
import {logoutUser} from "../../store/loginSlice";

export default function Header() {
  const dispatch = useDispatch()
  const logout = () => {
    const key = localStorage.getItem("key") as string;
    console.log(key)
    clientApi.userData
      .logout(key)
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

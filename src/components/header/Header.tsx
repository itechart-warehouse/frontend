import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { clientApi } from "../../services/clientApi";
import {useContext} from "react";
import {LoginContext} from "../../context/loginContext";

export default function Header() {
  const {setLoggedIn} = useContext(LoginContext);
  const logout = () => {
    const key = localStorage.getItem("key");

    // console.log(key);
    //TODO pass key to logout
    clientApi.userData.logout(key).then((res) => {
      console.log(res);
      localStorage.removeItem("key");
      setLoggedIn(false);
    });
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

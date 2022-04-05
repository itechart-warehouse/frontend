import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import PersonIcon from "@mui/icons-material/Person";
import BusinessIcon from "@mui/icons-material/Business";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import { clientApi } from "../../../services/clientApi";
import { logoutUser } from "../../../store/loginSlice";
import Button from "@mui/material/Button";

export default function UserInfo() {
  const dispatch = useDispatch();
  const jwt = useSelector((state: RootState) => state.user.user.jwt);
  const user = useSelector((state: RootState) => state.user.user.email);
  const company = useSelector(
    (state: RootState) => state.user.userCompany.name
  );
  const warehouse = useSelector(
    (state: RootState) => state.user.userWarehouse.name
  );
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logout = () => {
    clientApi.userData
      .logout(jwt)
      .then(() => {
        dispatch(logoutUser());
      })
      .catch((err) => alert(err));
  };
  const checkWarehouse = () => {
    if (warehouse) {
      return (
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <WarehouseIcon />
          </ListItemIcon>
          <Typography variant="inherit">{warehouse}</Typography>
        </MenuItem>
      );
    }
  };

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account info">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <PersonIcon sx={{ fontSize: 30, color: "white" }} />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem>
          <Avatar />
          {user}
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <BusinessIcon fontSize="small" />
          </ListItemIcon>
          {company}
        </MenuItem>
        {checkWarehouse()}
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <Logout fontSize="small" color="error" />
          </ListItemIcon>
          <Typography color="error">Logout</Typography>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
import * as React from "react";
import { Menu, MenuItem } from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export default function DriverButton() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();
  const driversRoute = () => {
    navigate("/drivers");
  };

  return (
    <>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={driversRoute}
        color="inherit"
      >
        Drivers
      </Button>
    </>
  );
}

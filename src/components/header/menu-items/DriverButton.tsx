import * as React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

export default function DriverButton() {
  const open = Boolean(null);

  const navigate = useNavigate();
  const driversRoute = () => navigate("/drivers");

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

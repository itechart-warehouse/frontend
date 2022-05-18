import * as React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

export default function TransportButton() {
  const navigate = useNavigate();
  const transportsRoute = () => navigate("/transports");

  return (
    <Button
      id="basic-button"
      aria-haspopup="true"
      onClick={transportsRoute}
      color="inherit"
    >
      Transports
    </Button>
  );
}

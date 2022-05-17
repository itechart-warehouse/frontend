import * as React from "react";
import { useNavigate } from "react-router-dom";
import { CardActions, CardContent, Button, Typography } from "@mui/material";

export default function TransportCard() {
  const navigate = useNavigate();
  const routeTransportList = () => navigate("/transports");

  return (
    <div>
      <CardContent>
        <Typography variant="h6" component="div">
          Car number
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          N/A
        </Typography>
        <Typography variant="h6" component="div">
          Contractor
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          N/A
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={routeTransportList}>List of transport</Button>
      </CardActions>
    </div>
  );
}

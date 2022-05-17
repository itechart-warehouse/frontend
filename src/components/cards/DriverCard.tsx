import * as React from "react";
import { useNavigate } from "react-router-dom";
import { CardContent, Typography, CardActions, Button } from "@mui/material";

function UserCard() {
  const navigate = useNavigate();
  const routeDriversList = () => navigate("/drivers");

  return (
    <div>
      <CardContent>
        <Typography variant="h4" component="div">
          Name
        </Typography>
        <br />
        <Typography variant="h6" component="div">
          Birth date
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Date
        </Typography>
        <Typography variant="h6" component="div">
          Passport
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Passport info
        </Typography>
        <Typography variant="h6" component="div">
          Contractor
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Contractor info
        </Typography>
        <CardActions>
          <Button onClick={routeDriversList}>List of drivers</Button>
        </CardActions>
      </CardContent>
    </div>
  );
}

export default UserCard;

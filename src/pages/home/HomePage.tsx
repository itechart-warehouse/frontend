import Header from "../../components/header/Header";
import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  const routeCompanyCard = () => {
    navigate("/company/card");
  };
  return (
    <>
      <Header />
      <Box>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: "100vh" }}
        >
          <Grid item xs={3}>
            {/*test button*/}
            <Button onClick={routeCompanyCard} variant="contained" fullWidth>
              Create new company
            </Button>
            <Typography variant="h2">Welcome to your WarehouseAPP</Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default HomePage;

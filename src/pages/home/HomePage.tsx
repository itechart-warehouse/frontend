import Header from "../../components/header/Header";
import { Box, Grid, Typography } from "@mui/material";
import React from "react";

function HomePage() {
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
            <Typography variant="h2">Welcome to your WarehouseAPP</Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default HomePage;

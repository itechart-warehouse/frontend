import { Box, Grid, Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  return (
    <>
      {/*<Header />*/}
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

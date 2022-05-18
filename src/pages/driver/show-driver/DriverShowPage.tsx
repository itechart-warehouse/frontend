import * as React from "react";
import { Box, Card, Grid, Typography } from "@mui/material";
import DriverCard from "../../../components/cards/DriverCard";
import DriverCardImage from "../../../image/DriverCard.svg";

const backgroundStyle = {
  height: "90vh",
  backgroundImage: `url(${DriverCardImage})`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right bottom",
  backgroundSize: "30%",
  marginRight: "20px",
};

function DriverShowPage() {
  return (
    <Grid sx={backgroundStyle}>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item>
          <Typography
            variant="h3"
            component="div"
            gutterBottom
            color="primary"
            align="center"
          >
            Driver info
          </Typography>
          <Box sx={{ minWidth: 500 }}>
            <Card variant="outlined">
              <DriverCard />
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default DriverShowPage;

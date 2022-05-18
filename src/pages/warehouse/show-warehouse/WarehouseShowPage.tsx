import * as React from "react";
import { Box, Card, Grid, Typography } from "@mui/material";
import WarehouseCard from "../../../components/cards/WarehouseCard";
import WarehouseCardImage from "../../../image/WarehouseCard.svg";

const backgroundStyle = {
  height: "90vh",
  backgroundImage: `url(${WarehouseCardImage})`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right bottom",
  backgroundSize: "25%",
  marginRight: "20px",
};

function WarehouseShowPage() {
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
            Warehouse info
          </Typography>
          <Box sx={{ minWidth: 500 }}>
            <Card variant="outlined">
              <WarehouseCard />
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default WarehouseShowPage;

import * as React from "react";
import { Box, Card, Grid, Typography } from "@mui/material";
import CompanyCard from "../../../components/cards/CompanyCard";
import CompanyCardImage from "../../../image/CompanyCard.svg";

const gridStyle = {
  height: "90vh",
  backgroundImage: `url(${CompanyCardImage})`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right bottom",
  backgroundSize: "25%",
};

function CompanyShowPage() {
  return (
    <Grid sx={gridStyle}>
      <Grid
        container
        spacing={0}
        direction="row"
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
            Company info
          </Typography>
          <Box sx={{ minWidth: 500 }}>
            <Card variant="outlined">
              <CompanyCard />
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default CompanyShowPage;

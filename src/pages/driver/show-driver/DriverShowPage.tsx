import { Box, Card, Grid, Typography } from "@mui/material";
import DriverCard from "../../../components/cards/DriverCard";

function DriverShowPage() {
  return (
    <>
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
    </>
  );
}

export default DriverShowPage;

import { Box, Card, Grid, Typography } from "@mui/material";
import ConsignmentCard from "../../../components/cards/ConsignmentCard";

function ConsignmentShowPage() {
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
            Consignment info
          </Typography>
          <Box sx={{ minWidth: 500 }}>
            <Card variant="outlined">
              <ConsignmentCard />
            </Card>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default ConsignmentShowPage;

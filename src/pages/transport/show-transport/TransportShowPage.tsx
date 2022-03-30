import { Box, Card, Grid, Typography } from "@mui/material";
import TransportCard from "../../../components/cards/TransportCard";

function TransportShowPage() {
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
            Transport info
          </Typography>
          <Box sx={{ minWidth: 500 }}>
            <Card variant="outlined">
              <TransportCard />
            </Card>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default TransportShowPage;

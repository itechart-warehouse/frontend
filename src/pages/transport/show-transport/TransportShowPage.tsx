import { Box, Card, Grid, Typography } from "@mui/material";
import TransportCard from "../../../components/cards/TransportCard";
// @ts-ignore
import TransportCardImage from "../../../image/TransportCard.svg";

const backgroundStyle = {
  height: "90vh",
  backgroundImage: `url(${TransportCardImage})`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right bottom",
  backgroundSize: "30%",
  marginRight: "20px",
};

function TransportShowPage() {
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
            Transport info
          </Typography>
          <Box sx={{ minWidth: 500 }}>
            <Card variant="outlined">
              <TransportCard />
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default TransportShowPage;

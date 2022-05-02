import { Box, Card, Grid, Typography } from "@mui/material";
import ConsignmentCard from "../../../components/cards/ConsignmentCard";
// @ts-ignore
import ConsignmentCardImage from "../../../image/ConsignmentCard.svg";

const backgroundStyle = {
  height: "90vh",
  backgroundImage: `url(${ConsignmentCardImage})`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right bottom",
  backgroundSize: "25%",
  marginRight: "20px",
};

function ConsignmentShowPage() {
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
            Incoming consignment info
          </Typography>
          <Box sx={{ minWidth: 500 }}>
            <Card variant="outlined">
              <ConsignmentCard />
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ConsignmentShowPage;

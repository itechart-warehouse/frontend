import { Box, Card, Grid, Typography } from "@mui/material";
import WarehouseConsignmentCard from "../../../components/cards/WarehouseConsignmentCard";
// @ts-ignore
import WarehouseConsignmentCardImage from "../../../image/WarehouseConsignmentCard.svg";

const backgroundStyle = {
  height: "90vh",
  backgroundImage: `url(${WarehouseConsignmentCardImage})`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right bottom",
  backgroundSize: "20%",
  marginRight: "20px",
};

function WarehouseConsignmentShowPage() {
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
            Warehouse consignment info
          </Typography>
          <Box sx={{ minWidth: 500 }}>
            <Card variant="outlined">
              <WarehouseConsignmentCard />
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default WarehouseConsignmentShowPage;

import { Alert, Box, Card, Grid, Typography } from "@mui/material";
import WarehouseConsignmentCard from "../../../components/cards/WarehouseConsignmentCard";

function WarehouseConsignmentShowPage() {
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
            Warehouse consignment info
          </Typography>
          <Alert severity="success">
            This consignment was registered in the warehouse.
          </Alert>
          <Box sx={{ minWidth: 500 }}>
            <Card variant="outlined">
              <WarehouseConsignmentCard />
            </Card>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default WarehouseConsignmentShowPage;

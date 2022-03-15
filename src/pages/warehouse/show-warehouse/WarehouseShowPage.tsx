import { Box, Card, Grid, Typography } from "@mui/material";
import WarehouseCard from "../../../components/cards/WarehouseCard";

function WarehouseShowPage() {
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
            Warehouse info
          </Typography>
          <Box sx={{ minWidth: 500 }}>
            <Card variant="outlined">
              <WarehouseCard />
            </Card>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default WarehouseShowPage;

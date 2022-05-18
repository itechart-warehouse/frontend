import * as React from "react";
import { Box, Grid, Typography } from "@mui/material";
import EditWarehouseForm from "../../../components/forms/warehouse-form/EditWarehouseForm";

function EditWarehousePage() {
  return (
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
          variant="h2"
          component="div"
          gutterBottom
          color="primary"
          align="center"
        >
          Edit warehouse
        </Typography>
        <Box sx={{ maxWidth: 500 }}>
          <EditWarehouseForm />
        </Box>
      </Grid>
    </Grid>
  );
}

export default EditWarehousePage;

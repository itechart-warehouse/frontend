import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import CreateWarehouseForm from "../../../components/forms/warehouse-form/CreateWarehouseForm";

const CreateWarehousePage = () => {
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
          Create warehouse
        </Typography>
        <Box sx={{ maxWidth: 500 }}>
          <CreateWarehouseForm />
        </Box>
      </Grid>
    </Grid>
  );
};

export default CreateWarehousePage;

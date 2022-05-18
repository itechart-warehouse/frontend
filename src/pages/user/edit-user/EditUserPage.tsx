import * as React from "react";
import { Grid, Typography, Box } from "@mui/material";
import EditUserForm from "../../../components/forms/user-form/EditUserForm";

const EditUserPage = () => {
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
          Edit user
        </Typography>
        <Box sx={{ maxWidth: 500 }}>
          <EditUserForm />
        </Box>
      </Grid>
    </Grid>
  );
};

export default EditUserPage;

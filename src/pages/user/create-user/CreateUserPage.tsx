import CreateUserForm from "../../../components/forms/user-form/CreateUserForm";
import React from "react";
import { Grid, Typography, Box } from "@mui/material";

const CreateUserPage = () => {
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
          Create user
        </Typography>
        <Box sx={{ maxWidth: 500 }}>
          <CreateUserForm />
        </Box>
      </Grid>
    </Grid>
  );
};

export default CreateUserPage;

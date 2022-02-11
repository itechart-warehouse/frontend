import CreateCompanyForm from "../../../components/forms/company-form/CreateCompanyForm";
import React from "react";
import { Grid, Typography, Container, Box } from "@mui/material";

const mainContainerStyle = {
  pt: 3,
};

const CreateCompanyPage = () => {
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
          Create company
        </Typography>
        <Box sx={{ maxWidth: 500 }}>
          <CreateCompanyForm />
        </Box>
      </Grid>
    </Grid>
  );
};

export default CreateCompanyPage;

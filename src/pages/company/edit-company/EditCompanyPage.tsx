import EditCompanyForm from "../../../components/forms/company-form/EditCompanyForm";
import React from "react";
import { Grid, Typography, Container, Box } from "@mui/material";

const mainContainerStyle = {
    pt: 3,
};

const EditCompanyPage = () => {
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
                    Edit company
                </Typography>
                <Box sx={{ maxWidth: 500 }}>
                    <EditCompanyForm  />
                </Box>
            </Grid>
        </Grid>
    );
};

export default EditCompanyPage;

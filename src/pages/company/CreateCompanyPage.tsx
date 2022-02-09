import  CreateCompanyForm  from '../../components/forms/company-form/CreateCompanyForm';
import Header from "../../components/header/Header";
import React from "react";
import {Grid, Typography, Container} from "@mui/material";
const mainContainerStyle = {
    pt:3,
};
const CreateCompanyPage = () => {
    return (
            <Container maxWidth="xl" sx={mainContainerStyle}>
                <Grid container spacing={0}
                      direction="column"
                      alignItems="center"
                      justifyContent="center"
                      style={{minHeight: '100vh'}}>
                    <Grid item>
                        <Typography variant="h2" component="div" gutterBottom color="primary" align="center">Create new Company</Typography>
                        <CreateCompanyForm/>
                    </Grid>
                </Grid>
            </Container>
    );
};

export default CreateCompanyPage;
import React from "react";
import { Grid, Typography, Box } from "@mui/material";

const CreateReportPage = () => {
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
                    Create report
                </Typography>
                <Box sx={{ maxWidth: 500 }}>
                    Form is here
                </Box>
            </Grid>
        </Grid>
    );
};

export default CreateReportPage;

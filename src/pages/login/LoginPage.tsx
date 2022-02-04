import LoginForm from "../../components/forms/login-form/LoginForm";
import {Grid, Typography} from "@mui/material";

function LoginPage() {
    return (
        <>
            <Grid container spacing={0}
                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                  style={{minHeight: '100vh'}}>
                <Grid item>
                    <Typography variant="h2" component="div" gutterBottom color="primary" align="center">Log
                        in</Typography>
                    <LoginForm/>
                </Grid>
            </Grid>
        </>
    )
}

export default LoginPage;
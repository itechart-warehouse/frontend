import * as React from "react";
import { Grid, Box } from "@mui/material";
import LoginForm from "../../components/forms/login-form/LoginForm";
import Login from "../../image/Login.svg";

function LoginPage() {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      <Box
        component="img"
        sx={{
          marginBottom: "60px",
        }}
        alt="Login"
        src={Login}
      />
      <Grid item>
        <LoginForm />
      </Grid>
    </Grid>
  );
}

export default LoginPage;

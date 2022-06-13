import * as React from "react";
import { Grid, Box, Alert } from "@mui/material";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import LoginForm from "../../components/forms/login-form/LoginForm";
// @ts-ignore
import Login from "../../image/Login.svg";
import { clearError } from "../../store/errorSlice";

function LoginPage() {
  const error = useSelector((state: RootStateOrAny) => state.error.errors);
  const dispatch = useDispatch();
  setTimeout(() => dispatch(clearError()), 5000);
  const errorAlert = () => {
    if (error.length) {
      clearTimeout();
      return <Alert severity="error">{error[0]}</Alert>;
    } else {
      return "";
    }
  };

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
        sx={{
          height: "60px",
          marginBottom: "60px",
        }}
      >
        {errorAlert()}
      </Box>
      <Box
        component="img"
        sx={{
          marginBottom: "60px",
        }}
        alt="Login"
        src={Login}
      />
      <Grid item sx={{ width: 570 }}>
        <LoginForm />
      </Grid>
    </Grid>
  );
}

export default LoginPage;

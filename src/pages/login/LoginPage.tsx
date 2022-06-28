import LoginForm from "../../components/forms/login-form/LoginForm";
import { Grid, Typography, Box, Alert } from "@mui/material";
// @ts-ignore
import Login from "../../image/Login.svg";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
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
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        style={{ minHeight: "100vh" }}
      >
        <Box
          sx={{
            height: "50px",
            marginBottom: "30px",
            marginTop: "30px",
          }}
        >
          {errorAlert()}
        </Box>
        <Box
          component="img"
          sx={{
            height: "270px",
            marginBottom: "20px",
          }}
          alt="Login"
          src={Login}
        />
        <Grid item sx={{ width: 570 }}>
          {/*<Typography*/}
          {/*  variant="h2"*/}
          {/*  component="div"*/}
          {/*  gutterBottom*/}
          {/*  color="primary"*/}
          {/*  align="center"*/}
          {/*>*/}
          {/*  Log in*/}
          {/*</Typography>*/}
          <LoginForm />
        </Grid>
      </Grid>
    </>
  );
}

export default LoginPage;

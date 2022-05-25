import LoginForm from "../../components/forms/login-form/LoginForm";
import { Grid, Typography, Box } from "@mui/material";
// @ts-ignore
import Login from "../../image/Login.svg";

function LoginPage() {
  return (
    <>
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
        <Grid item
        sx={{ width: 570 }}
        >
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

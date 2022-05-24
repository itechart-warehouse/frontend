import { Grid, Box } from "@mui/material";
import RecoverPasswordForm from "../../components/forms/recover-password-form/RecoverPasswordForm";
// @ts-ignore
import Login from "../../image/Login.svg";

function RecoverPasswordPage() {
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
          <RecoverPasswordForm />
        </Grid>
      </Grid>
    </>
  );
}

export default RecoverPasswordPage;

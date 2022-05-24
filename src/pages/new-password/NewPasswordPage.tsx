import { Grid, Box } from "@mui/material";
import NewPasswordForm from "../../components/forms/new-password-form/NewPasswordForm";

// @ts-ignore
import Login from "../../image/Login.svg";

function NewPasswordPage() {
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
          <NewPasswordForm />
        </Grid>
      </Grid>
    </>
  );
}

export default NewPasswordPage;

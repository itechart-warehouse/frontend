import RecoverPasswordForm from "../../components/forms/recover-password-form/RecoverPasswordForm";
import { Grid, Typography } from "@mui/material";

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
        <Grid item>
          <Typography
            variant="h4"
            component="div"
            gutterBottom
            color="primary"
            align="center"
            marginBottom="30px"
          >
            Forgot your password?
          </Typography>
          <RecoverPasswordForm />
        </Grid>
      </Grid>
    </>
  );
}

export default RecoverPasswordPage;

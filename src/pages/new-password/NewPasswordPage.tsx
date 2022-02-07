import { Grid, Typography } from "@mui/material";
import NewPasswordForm from "../../components/forms/new-password-form/NewPasswordForm";

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
        <Grid item>
          <Typography
            variant="h4"
            component="div"
            gutterBottom
            color="primary"
            align="center"
            marginBottom="30px"
          >
            New password
          </Typography>
          <NewPasswordForm />
        </Grid>
      </Grid>
    </>
  );
}

export default NewPasswordPage;

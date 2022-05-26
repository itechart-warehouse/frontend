import { useFormik } from "formik";
import { Button, Grid, TextField, Typography } from "@mui/material";
import * as yup from "yup";
import { clientApi } from "../../../services/clientApi";
import { useDispatch } from "react-redux";
import { Values } from "./RecoverPasswordForm.types";
import { Link } from "react-router-dom";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
});

function RecoverPasswordForm() {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: (email: Values) => {
      clientApi.recoverData
        .recoverEmail(email)
        .then((res) => {
          // TODO: we can show response.data.messages on form
          // so user will see if email has been sent or not
          // dispatch(loginUser(res));
        });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        fullWidth
        id="email"
        name="email"
        label="Email"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
        sx={{ mb: 3 }}
      />
      <Button
        color="primary"
        variant="contained"
        fullWidth
        type="submit"
        style={{ margin: "0 0 10px 0" }}
      >
        Send instructions
      </Button>
      <Grid container>
        <Grid item xs>
          <Typography>
            <Link to="/" style={{ color: "#1976d2" }}>
              Back to login page
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </form>
  );
}

export default RecoverPasswordForm;

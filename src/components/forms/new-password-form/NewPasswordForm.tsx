import { useFormik } from "formik";
import { Button, Grid, TextField, Typography } from "@mui/material";
import * as yup from "yup";
import { clientApi } from "../../../services/clientApi";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Values } from "./NewPasswordForm.types";

const validationSchema = yup.object({
  password: yup
    .string()
    .min(6, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  // TODO: add password match validation
});

function NewPasswodForm() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const reset_password_token = searchParams.get('reset_password_token')

  const formik = useFormik({
    initialValues: {
      password: "",
      password_confirmation: "",
      reset_password_token: reset_password_token,
    },
    validationSchema: validationSchema,
    onSubmit: (newPassword: Values) => {
      clientApi.recoverData
        .newPassword(newPassword)
        .then((res) => {
          // TODO: we can add alert or form messages with response.data.messages
          // where will be status of update password 
          navigate("/");
        });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        fullWidth
        id="password"
        name="password"
        label="Password"
        type="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
        sx={{ mb: 3 }}
      />
      <TextField
        fullWidth
        id="password_confirmation"
        name="password_confirmation"
        label="Password confirmation"
        type="password"
        value={formik.values.password_confirmation}
        onChange={formik.handleChange}
        error={formik.touched.password_confirmation && Boolean(formik.errors.password_confirmation)}
        helperText={formik.touched.password_confirmation && formik.errors.password_confirmation}
        sx={{ mb: 3 }}
      />

      <Button
        color="primary"
        variant="contained"
        fullWidth
        type="submit"
        style={{ margin: "0 0 10px 0" }}
      >
        Set new password
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

export default NewPasswodForm;

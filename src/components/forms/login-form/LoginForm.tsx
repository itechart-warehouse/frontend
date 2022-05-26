import { useFormik } from "formik";
import { Alert, Box, Button, Grid, TextField, Typography } from "@mui/material";
import * as yup from "yup";
import { clientApi } from "../../../services/clientApi";
import { Link } from "react-router-dom";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../store/loginSlice";
import { clearError, setError } from "../../../store/errorSlice";
import { Values } from "./LoginForm.types";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

function LoginForm() {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (user: Values) => {
      clientApi.userData.login(user).then((res) => {
        dispatch(loginUser(res));
        dispatch(clearError());
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
      <Button
        color="primary"
        variant="contained"
        fullWidth
        type="submit"
        style={{ margin: "0 0 10px 0" }}
      >
        Log In
      </Button>
      <Grid container>
        <Grid item xs>
          <Typography>
            {/*TODO add path to recover password and change color definition*/}
            <Link to="/users/password/new" style={{ color: "#1976d2" }}>
              Forgot password?
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </form>
  );
}

export default LoginForm;

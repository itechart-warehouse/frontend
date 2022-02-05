import { useFormik } from "formik";
import { Button, Grid, TextField, Typography } from "@mui/material";
import * as yup from "yup";
import { clientApi } from "../../../services/clientApi";
import { useContext } from "react";
import { LoginContext } from "../../../context/loginContext";
import { Link } from "react-router-dom";

interface Values {
  email: string;
  password: string;
}

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
  const { setLoggedIn } = useContext(LoginContext);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (user: Values) => {
      clientApi.userData
        .login(user)
        .then((res) => {
          localStorage.setItem("key", res.headers.authorization);
          setLoggedIn(true);
        })
        .catch((err) => {
          if (err.response) {
            alert(err.response.data);
          } else if (err.request) {
            console.log(err.request);
            alert("Server is not working");
          } else {
            console.log(err.message);
            alert(err.message);
          }
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
        Submit
      </Button>
      <Grid container>
        <Grid item xs>
          <Typography>
            {/*TODO change color definition*/}
            <Link to="/password" style={{ color: "#1976d2" }}>
              Forgot password?
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </form>
  );
}

export default LoginForm;

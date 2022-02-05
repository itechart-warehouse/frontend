import { useFormik } from "formik";
import { Button, Grid, TextField } from "@mui/material";
import * as yup from "yup";
import { clientApi } from "../../../services/clientApi";
import { useNavigate } from "react-router-dom";

interface Values {
  email: string;
}

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
});

const submitBtnStyle = { mt: 3, mb: 2 };

function RecoverPasswordForm() {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: (email: Values) => {
      //console.log(email);
      clientApi.recoverData
        .recoverEmail(email)
        .then((res) => console.log(res.config.data))
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

  let navigate = useNavigate();
  const routeLogin = () => {
    let path = "/";
    navigate(path);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        fullWidth={true}
        id="email"
        name="email"
        label="Email"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />
      <Button type="submit" fullWidth variant="contained" sx={submitBtnStyle}>
        Send me reset password instructions
      </Button>
      <Grid container>
        <Grid item xs>
          <Button onClick={routeLogin} variant="outlined" fullWidth>
            Cancel
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default RecoverPasswordForm;

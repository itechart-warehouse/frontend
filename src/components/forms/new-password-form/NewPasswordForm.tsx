import { useFormik } from "formik";
import { Button, TextField } from "@mui/material";
import * as yup from "yup";
import { clientApi } from "../../../services/clientApi";

interface Values {
  password: string;
  passwordConfirmation: string;
}

const validationSchema = yup.object({
  password: yup
    .string()
    .min(6, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const submitBtnStyle = { mt: 3, mb: 2 };

function NewPasswordForm() {
  const formik = useFormik({
    initialValues: {
      password: "",
      passwordConfirmation: "",
    },
    validationSchema: validationSchema,
    onSubmit: (password: Values) => {
      //console.log(email);
      clientApi.recoverPassword
        .recoverPassword(password)
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

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        fullWidth={true}
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
        fullWidth={true}
        id="passwordConfirmation"
        name="passwordConfirmation"
        label="Password Confirmation"
        type="password"
        value={formik.values.passwordConfirmation}
        onChange={formik.handleChange}
        error={
          formik.touched.passwordConfirmation &&
          Boolean(formik.errors.passwordConfirmation)
        }
        helperText={
          formik.touched.passwordConfirmation &&
          formik.errors.passwordConfirmation
        }
        sx={{ mb: 3 }}
      />
      <Button type="submit" fullWidth variant="contained" sx={submitBtnStyle}>
        Submit
      </Button>
    </form>
  );
}

export default NewPasswordForm;

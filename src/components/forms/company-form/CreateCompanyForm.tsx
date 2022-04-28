import { useFormik } from "formik";
import { Button, TextField, Typography } from "@mui/material";
import * as yup from "yup";
import { clientApi } from "../../../services/clientApi";
import { useNavigate } from "react-router-dom";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { clearError, setError } from "../../../store/errorSlice";
import InputMask from "react-input-mask";
import { Values } from "./CreateCompany.types";

const validationSchema = yup.object({
  userEmail: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  userPassword: yup
    .string()
    .min(6, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  birthDate: yup.string().required("Birth date is required"),
  address: yup.string().required("Address is required"),
  companyName: yup.string().required("Company name is required"),
  companyAddress: yup.string().required("Company address is required"),
  companyPhone: yup
    .string()
    .test("len", "Invalid", (val = "") => {
      const val_length_without_dashes = val.replace(/-|_/g, "").length;
      return val_length_without_dashes === 15;
    })
    .required("Company phone is required"),
  companyEmail: yup
    .string()
    .email("Enter a valid email")
    .required("Company email is required"),
});

function CreateCompanyForm() {
  const jwt = useSelector((state: RootState) => state.user.user.jwt);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      userEmail: "",
      userPassword: "",
      firstName: "",
      lastName: "",
      birthDate: "",
      address: "",
      companyName: "",
      companyAddress: "",
      companyPhone: "",
      companyEmail: "",
    },
    validationSchema: validationSchema,
    onSubmit: (data: Values) => {
      clientApi.company
        .create(data, jwt)
        .catch((err) => {
          if (err.response) {
            err.response.status === 500 || err.response.status === 401
              ? dispatch(setError([err.response.statusText]))
              : dispatch(
                  setError([
                    ...err.response.data.company_errors,
                    ...err.response.data.user_errors,
                  ])
                );
          } else if (err.request) {
            dispatch(setError(["Server is not working"]));
            console.log("request", err.request);
          } else {
            dispatch(setError([err.message]));
            console.log("message", err.message);
          }
          return Promise.reject(err);
        })
        .then(() => {
          dispatch(clearError());
          routeCompaniesList();
        });
    },
  });

  const routeCompaniesList = () => {
    navigate("/companies");
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        fullWidth
        id="companyName"
        name="companyName"
        label="Company Name"
        value={formik.values.companyName}
        onChange={formik.handleChange}
        error={formik.touched.companyName && Boolean(formik.errors.companyName)}
        helperText={formik.touched.companyName && formik.errors.companyName}
        sx={{ mb: 3 }}
      />

      <TextField
        fullWidth
        id="companyEmail"
        name="companyEmail"
        label="Company Email"
        value={formik.values.companyEmail}
        onChange={formik.handleChange}
        error={
          formik.touched.companyEmail && Boolean(formik.errors.companyEmail)
        }
        helperText={formik.touched.companyEmail && formik.errors.companyEmail}
        sx={{ mb: 3 }}
      />
      <InputMask
        mask="+375-(99)-9999999"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.companyPhone}
      >
        {() => (
          <TextField
            type="text"
            label="Phone Number (Ex: +375-29-1234567)"
            name="companyPhone"
            fullWidth
            variant="outlined"
            onChange={formik.handleChange}
            error={
              formik.touched.companyPhone && Boolean(formik.errors.companyPhone)
            }
            helperText={
              formik.touched.companyPhone && formik.errors.companyPhone
            }
            sx={{ mb: 3 }}
          />
        )}
      </InputMask>
      <TextField
        fullWidth
        id="companyAddress"
        name="companyAddress"
        label="Company Address"
        value={formik.values.companyAddress}
        onChange={formik.handleChange}
        error={
          formik.touched.companyAddress && Boolean(formik.errors.companyAddress)
        }
        helperText={
          formik.touched.companyAddress && formik.errors.companyAddress
        }
        sx={{ mb: 3 }}
      />
      <Typography
        variant="h4"
        component="div"
        gutterBottom
        color="primary"
        align="center"
      >
        User data
      </Typography>
      <TextField
        fullWidth
        id="userEmail"
        name="userEmail"
        label="User Email"
        value={formik.values.userEmail}
        onChange={formik.handleChange}
        error={formik.touched.userEmail && Boolean(formik.errors.userEmail)}
        helperText={formik.touched.userEmail && formik.errors.userEmail}
        sx={{ mb: 3 }}
      />
      <TextField
        fullWidth
        id="userPassword"
        name="userPassword"
        label="User Password"
        type="password"
        value={formik.values.userPassword}
        onChange={formik.handleChange}
        error={
          formik.touched.userPassword && Boolean(formik.errors.userPassword)
        }
        helperText={formik.touched.userPassword && formik.errors.userPassword}
        sx={{ mb: 3 }}
      />
      <TextField
        fullWidth
        id="firstName"
        name="firstName"
        label="First Name"
        value={formik.values.firstName}
        onChange={formik.handleChange}
        error={formik.touched.firstName && Boolean(formik.errors.firstName)}
        helperText={formik.touched.firstName && formik.errors.firstName}
        sx={{ mb: 3 }}
      />
      <TextField
        fullWidth
        id="lastName"
        name="lastName"
        label="Last Name"
        value={formik.values.lastName}
        onChange={formik.handleChange}
        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
        helperText={formik.touched.lastName && formik.errors.lastName}
        sx={{ mb: 3 }}
      />
      <TextField
        fullWidth
        id="address"
        name="address"
        label="Address"
        value={formik.values.address}
        onChange={formik.handleChange}
        error={formik.touched.address && Boolean(formik.errors.address)}
        helperText={formik.touched.address && formik.errors.address}
        sx={{ mb: 3 }}
      />
      <TextField
        fullWidth
        id="birthDate"
        name="birthDate"
        label="Birth Date"
        InputLabelProps={{
          shrink: true,
        }}
        type="date"
        value={formik.values.birthDate}
        onChange={formik.handleChange}
        error={formik.touched.birthDate && Boolean(formik.errors.birthDate)}
        helperText={formik.touched.birthDate && formik.errors.birthDate}
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
      <Button onClick={routeCompaniesList} variant="outlined" fullWidth>
        Cancel
      </Button>
    </form>
  );
}

export default CreateCompanyForm;

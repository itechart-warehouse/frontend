import { useFormik } from "formik";
import { Button, TextField, Typography } from "@mui/material";
import * as yup from "yup";
import { clientApi } from "../../../services/clientApi";
import { useNavigate, useParams } from "react-router-dom";
import React from "react";
import { clearError, setError } from "../../../store/errorSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import InputMask from "react-input-mask";
import { Values } from "./CreateWarehouse.types";

const validationSchema = yup.object({
  userEmail: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  userPassword: yup
    .string()
    .min(6, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  firstName: yup
    .string()
    .min(3, "Too short. Minimum 3 characters")
    .required("First name is required"),
  lastName: yup
    .string()
    .min(3, "Too short. Minimum 3 characters")
    .required("Last name is required"),
  birthDate: yup.string().required("Birth date is required"),
  address: yup
    .string()
    .min(3, "Too short. Minimum 3 characters")
    .required("Address is required"),
  warehouseName: yup
    .string()
    .min(3, "Too short. Minimum 3 characters")
    .required("Warehouse name is required"),
  warehouseAddress: yup
    .string()
    .min(3, "Too short. Minimum 3 characters")
    .required("Warehouse address is required"),
  warehousePhone: yup
    .string()
    .test("len", "Invalid", (val = "") => {
      const val_length_without_dashes = val.replace(/-|_/g, "").length;
      return val_length_without_dashes === 15;
    })
    .required("Warehouse phone is required"),
  area: yup.number().required("Area is required"),
});

function CreateWarehouseForm() {
  const jwt = useSelector((state: RootState) => state.user.user.jwt);
  const navigate = useNavigate();
  const { id } = useParams();
  const routeWarehouseList = () => {
    navigate(`/companies/${id}/warehouses`);
  };
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      userEmail: "",
      userPassword: "",
      firstName: "",
      lastName: "",
      birthDate: "",
      address: "",
      warehouseName: "",
      warehouseAddress: "",
      warehousePhone: "",
      area: "",
      active: true,
    },
    validationSchema: validationSchema,
    onSubmit: (data: Values) => {
      clientApi.warehouse
        .create(data, id, jwt)
        .catch((err) => {
          if (err.response) {
            err.response.status === 500 || err.response.status === 401
              ? dispatch(setError([err.response.statusText]))
              : dispatch(setError([...err.response.data.user_errors]));
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
          routeWarehouseList();
        });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        fullWidth
        id="warehouseName"
        name="warehouseName"
        label="Warehouse Name"
        value={formik.values.warehouseName}
        onChange={formik.handleChange}
        error={
          formik.touched.warehouseName && Boolean(formik.errors.warehouseName)
        }
        helperText={formik.touched.warehouseName && formik.errors.warehouseName}
        sx={{ mb: 3 }}
      />

      <TextField
        fullWidth
        id="area"
        name="area"
        label="Area"
        value={formik.values.area}
        onChange={formik.handleChange}
        error={formik.touched.area && Boolean(formik.errors.area)}
        helperText={formik.touched.area && formik.errors.area}
        sx={{ mb: 3 }}
      />
      <InputMask
        mask="+375-(99)-9999999"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.warehousePhone}
      >
        {() => (
          <TextField
            type="text"
            label="Phone Number (Ex: +375-(29)-1234567)"
            name="warehousePhone"
            fullWidth
            variant="outlined"
            onChange={formik.handleChange}
            error={
              formik.touched.warehousePhone &&
              Boolean(formik.errors.warehousePhone)
            }
            helperText={
              formik.touched.warehousePhone && formik.errors.warehousePhone
            }
            sx={{ mb: 3 }}
          />
        )}
      </InputMask>
      <TextField
        fullWidth
        id="warehouseAddress"
        name="warehouseAddress"
        label="Warehouse Address"
        value={formik.values.warehouseAddress}
        onChange={formik.handleChange}
        error={
          formik.touched.warehouseAddress &&
          Boolean(formik.errors.warehouseAddress)
        }
        helperText={
          formik.touched.warehouseAddress && formik.errors.warehouseAddress
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
        Warehouse admin data
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
        lang="en"
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
      <Button onClick={routeWarehouseList} variant="outlined" fullWidth>
        Cancel
      </Button>
    </form>
  );
}

export default CreateWarehouseForm;

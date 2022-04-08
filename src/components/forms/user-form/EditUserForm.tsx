import { useFormik } from "formik";
import {
    Button,
    FormControl, FormControlLabel,
    InputLabel,
    MenuItem,
    Select, Switch,
    TextField,
} from "@mui/material";
import * as yup from "yup";
import { clientApi } from "../../../services/clientApi";
import { useNavigate, useParams } from "react-router-dom";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { RootState } from "../../../store";
import { clearError, setError } from "../../../store/errorSlice";

interface Values {
  firstName: string;
  lastName: string;
  address: string;
  birthDate: string;
  userRoleId: number;
    active: boolean;
}

const validationSchema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  address: yup.string().required("Address is required"),
  birthDate: yup.string().required("Birth date is required"),
    active: yup.boolean().required("Active is required"),
});

function EditUserForm() {
  const jwt = useSelector((state: RootState) => state.user.user.jwt);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const user = useSelector((state: RootStateOrAny) => state.userCard.userCard);
  const formik = useFormik({
    initialValues: {
      firstName: user.user.first_name,
      lastName: user.user.last_name,
      address: user.user.address,
      birthDate: user.user.birth_date,
      userRoleId: user.user.user_role_id,
      active: user.user.active,
    },

    validationSchema: validationSchema,
    onSubmit: (data: Values) => {
      clientApi.user
        .editUserById(id, data, jwt)
        .catch((err) => {
          console.log(err.request);
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
          //  TODO we need to clear current user state after submit
          dispatch(clearError());
          routeUsersList();
        });
    },
  });

  const routeUsersList = () => {
    navigate("/users");
  };

  return (
    <form onSubmit={formik.handleSubmit}>
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
        value={formik.values.birthDate}
        onChange={formik.handleChange}
        error={formik.touched.birthDate && Boolean(formik.errors.birthDate)}
        helperText={formik.touched.birthDate && formik.errors.birthDate}
        sx={{ mb: 3 }}
      />
        <FormControlLabel
            sx={{ mb: 3 }}
            control={
                <Switch
                    id="active"
                    name="active"
                    checked={formik.values.active}
                    onChange={formik.handleChange}
                />
            }
            label="Active?"
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
      <Button onClick={routeUsersList} variant="outlined" fullWidth>
        Cancel
      </Button>
    </form>
  );
}

export default EditUserForm;

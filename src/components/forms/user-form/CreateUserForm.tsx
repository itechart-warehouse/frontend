import { useFormik } from "formik";
import {
  Button,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import * as yup from "yup";
import { clientApi } from "../../../services/clientApi";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { clearError } from "../../../store/errorSlice";
import { Values, Roles } from "./CreateUser.types";

const validationSchema = yup.object({
  userEmail: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  firstName: yup
    .string()
    .min(3, "Too short. Minimum 3 characters")
    .required("First name is required"),
  lastName: yup
    .string()
    .min(3, "Too short. Minimum 3 characters")
    .required("Last name is required"),
  birthDate: yup.date().required("Birth date is required"),
  address: yup
    .string()
    .min(3, "Too short. Minimum 3 characters")
    .required("Address is required"),
  // company_id: yup.string().required("Company name is required"),
  role_id: yup.string().required("Company address is required"),
});

function CreateUserForm() {
  const jwt = useSelector((state: RootState) => state.user.user.jwt);
  const navigate = useNavigate();
  // const [companies, setCompanies] = useState<Company[]>([]);
  const [roles, setRoles] = useState<Roles[]>([]);
  const dispatch = useDispatch();
  const [value, setValue] = useState<Date | null>(null);

  useEffect(() => {
    clientApi.user.getInfoToCreate(jwt).then((response) => {
      dispatch(clearError());
      // setCompanies(response.data.companies);
      setRoles(response.data.roles);
    });
  }, []);

  const routeUsersList = () => {
    navigate("/users");
  };

  const formik = useFormik({
    initialValues: {
      userEmail: "",
      firstName: "",
      lastName: "",
      birthDate: "",
      address: "",
      company_id: "",
      role_id: "",
    },
    validationSchema: validationSchema,
    onSubmit: (data: Values) => {
      clientApi.user.create(data, jwt).then(() => {
        dispatch(clearError());
        routeUsersList();
      });
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
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
      {/*<FormControl fullWidth>*/}
      {/*  <InputLabel id="Company">Company</InputLabel>*/}
      {/*  <Select*/}
      {/*    id="companyId"*/}
      {/*    value={formik.values.company_id}*/}
      {/*    label="Company"*/}
      {/*    name="company_id"*/}
      {/*    onChange={formik.handleChange}*/}
      {/*    sx={{ mb: 3 }}*/}
      {/*  >*/}
      {/*    {companies.length &&*/}
      {/*      companies.map((company) => (*/}
      {/*        <MenuItem key={company.id} value={company.id}>*/}
      {/*          {company.name}*/}
      {/*        </MenuItem>*/}
      {/*      ))}*/}
      {/*  </Select>*/}
      {/*</FormControl>*/}

      <FormControl fullWidth>
        <InputLabel id="Role">Role</InputLabel>
        <Select
          id="roleId"
          value={formik.values.role_id}
          label="Role"
          name="role_id"
          onChange={formik.handleChange}
          sx={{ mb: 3 }}
        >
          {roles.length &&
            roles.map((role) => (
              <MenuItem key={role.id} value={role.id}>
                {role.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>

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

export default CreateUserForm;

import { useFormik } from "formik";
import { Button, FormControlLabel, Switch, TextField } from "@mui/material";
import * as yup from "yup";
import { clientApi } from "../../../services/clientApi";
import { useNavigate, useParams } from "react-router-dom";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import React from "react";
import { RootState } from "../../../store";
import { clearError, setError } from "../../../store/errorSlice";
import InputMask from "react-input-mask";
import Chip from "@mui/material/Chip";
import { Values } from "./EditCompany.types";

const validationSchema = yup.object({
  companyName: yup
    .string()
    .min(3, "Too short. Minimum 3 characters")
    .required("Company name is required"),
  companyAddress: yup
    .string()
    .min(3, "Too short. Minimum 3 characters")
    .required("Company address is required"),
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
  active: yup.boolean().required("Active is required"),
});

function EditCompanyForm() {
  const jwt = useSelector((state: RootState) => state.user.user.jwt);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  //TODO we need request to BE to get company by id and set initial values
  const company = useSelector((state: RootStateOrAny) => state.company.company);
  const formik = useFormik({
    initialValues: {
      companyName: company.name,
      companyAddress: company.address,
      companyPhone: company.phone,
      companyEmail: company.email,
      active: company.active,
    },
    validationSchema: validationSchema,
    onSubmit: (data: Values) => {
      clientApi.company
        .editCompanyById(id, data, jwt)
        .then(() => {
          //  TODO we need to clear current company state after submit
          dispatch(clearError());
          routeCompaniesList();
        });
    },
  });

  const routeCompaniesList = () => {
    navigate("/companies");
  };
  // const state = {checked: formik.values.active};
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
            label="Phone Number (Ex: +375-(29)-1234567)"
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
        label={
          formik.values.active ? (
            <Chip label="Active company" color="success" />
          ) : (
            <Chip label="Inactive company" />
          )
        }
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

export default EditCompanyForm;

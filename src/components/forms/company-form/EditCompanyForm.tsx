import { useFormik } from "formik";
import { Button, FormControlLabel, Switch, TextField } from "@mui/material";
import * as yup from "yup";
import { clientApi } from "../../../services/clientApi";
import { useNavigate, useParams } from "react-router-dom";
import { RootStateOrAny, useSelector } from "react-redux";
import React from "react";

interface Values {
  companyName: string;
  companyAddress: string;
  companyPhone: string;
  companyEmail: string;
  active: boolean;
}

const validationSchema = yup.object({
  companyName: yup.string().required("Company name is required"),
  companyAddress: yup.string().required("Company address is required"),
  companyPhone: yup.string().required("Company phone is required"),
  companyEmail: yup
    .string()
    .email("Enter a valid email")
    .required("Company email is required"),
  active: yup.boolean().required("Active is required"),
});

function EditCompanyForm() {
  const navigate = useNavigate();
  const routeCompaniesList = () => {
    navigate("/companies");
  };
  const { id } = useParams();
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
        .editCompanyById(id, data)
        .then((res) => {
          res.status === 200 && routeCompaniesList();
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
      <TextField
        fullWidth
        id="companyPhone"
        name="companyPhone"
        label="Company Phone"
        value={formik.values.companyPhone}
        onChange={formik.handleChange}
        error={
          formik.touched.companyPhone && Boolean(formik.errors.companyPhone)
        }
        helperText={formik.touched.companyPhone && formik.errors.companyPhone}
        sx={{ mb: 3 }}
      />
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
      <Button onClick={routeCompaniesList} variant="outlined" fullWidth>
        Cancel
      </Button>
    </form>
  );
}

export default EditCompanyForm;

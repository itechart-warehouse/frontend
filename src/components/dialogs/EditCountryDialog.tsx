import { RootState } from "../../store";
import React, { useEffect, useState } from "react";
import { clientApi } from "../../services/clientApi";
import { clearError } from "../../store/errorSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  Divider,
  Button,
  DialogTitle,
  Dialog,
  TextField,
  Box,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { CountryData, CountryProps } from "./CountryCatalogDialog.types";

import EditIcon from "@mui/icons-material/Edit";

const validationSchema = yup.object({
  name: yup
    .string()
    .min(3, "Country name length should be of minimum 3 characters")
    .required("Name is required"),
});

export default function EditCountryDialog({ countryId, name }: CountryProps) {
  const [open, setOpen] = useState(false);
  const jwt = useSelector((state: RootState) => state.user.user.jwt);
  const dispatch = useDispatch();
  const initialValues = {
    name: name,
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (data: CountryData, { resetForm }) => {
      clientApi.country
        .update(jwt, data, countryId)
        .then((response) => {
          dispatch(clearError());
          setOpen(false);
          window.location.reload();
        })
        .catch((error) => {
          resetForm({});
          window.scrollTo(0, 0);
        });
      console.log("data", data);
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const twinkleBlue = "#e9ecef";
  const headStyle = {
    backgroundColor: twinkleBlue,
  };

  return (
    <>
      <Button onClick={() => handleClickOpen()} variant="outlined" size="small">
        <EditIcon />
      </Button>
      <Box>
        <Dialog fullWidth={true} open={open} onClose={() => setOpen(false)}>
          <DialogTitle>Edit country</DialogTitle>
          <Divider />
          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              id="name"
              name="name"
              label="Country"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              sx={{ mb: 3 }}
            />
            <Box sx={{ display: "flex" }}>
              <Button
                variant="contained"
                type="submit"
                style={{ margin: "0 0 10px 0" }}
              >
                Submit
              </Button>
            </Box>
          </form>
        </Dialog>
      </Box>
    </>
  );
}

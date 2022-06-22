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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Box,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { CountryData } from "./CountryCatalogDialog.types";

import EditIcon from "@mui/icons-material/Edit";
import { CityData, CityProps, Countries } from "./CityCatalogDialog.types";

const validationSchema = yup.object({
  name: yup
    .string()
    .min(3, "Country name length should be of minimum 3 characters")
    .required("Name is required"),
});

export default function EditCityDialog({
  cityId,
  name,
  country_id,
}: CityProps) {
  const [countries, setCountries] = useState<Countries[]>([]);
  const [currentCountry, setCurrentCountry] = useState<CountryData>();
  useEffect(() => {
    clientApi.country.getAll(jwt).then((response) => {
      dispatch(clearError());
      setCountries(response.data.countries);
    });
  }, []);

  const [open, setOpen] = useState(false);
  const jwt = useSelector((state: RootState) => state.user.user.jwt);
  const dispatch = useDispatch();
  const initialValues = {
    name: name,
    country_id: country_id,
  };
  // useEffect(() => {
  //   clientApi.country.getAll(jwt).then((response) => {
  //     dispatch(clearError());
  //     setCountries(response.data.countries);
  //   });
  // }, []);

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (data: CityData, { resetForm }) => {
      clientApi.city
        .update(jwt, data, cityId, country_id)
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
          <DialogTitle>Edit city</DialogTitle>
          <Divider />
          <form onSubmit={formik.handleSubmit}>
            <FormControl fullWidth>
              <InputLabel id="country_id" sx={{ minWidth: 300 }}>
                Country
              </InputLabel>
              <Select
                id="country_id"
                value={formik.values.country_id}
                label="country_id"
                name="country_id"
                onChange={formik.handleChange}
                sx={{ mb: 3 }}
              >
                {countries.length &&
                  countries.map((country) => (
                    <MenuItem key={country.id} value={country.id}>
                      {country.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              id="name"
              name="name"
              label="City"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              sx={{ mb: 3 }}
            />

            <Button
              color="primary"
              variant="contained"
              //onClick={formik.handleReset}
              type="submit"
              style={{ margin: "0 0 10px 0" }}
            >
              Submit
            </Button>
          </form>
        </Dialog>
      </Box>
    </>
  );
}

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
import AddIcon from "@mui/icons-material/Add";
import { CityData, Countries } from "./CityCatalogDialog.types";

export default function CityCatalogDialog() {
  const [open, setOpen] = useState(false);
  const jwt = useSelector((state: RootState) => state.user.user.jwt);
  const dispatch = useDispatch();
  const country_id = useSelector(
    (state: RootState) => state.country.country.id
  );
  const initialValues = {
    country_id: 0,
    name: "",
  };

  const [countries, setCountries] = useState<Countries[]>([]);

  useEffect(() => {
    clientApi.country.getAll(jwt).then((response) => {
      dispatch(clearError());
      setCountries(response.data.countries);
    });
  }, []);

  const formik = useFormik({
    initialValues,
    onSubmit: (data: CityData, { resetForm }) => {
      clientApi.city
        .create(jwt, data, country_id)
        .then((response) => {
          dispatch(clearError());
          setOpen(false);
          window.location.reload();
        })
        .catch((error) => {
          resetForm({});
          window.scrollTo(0, 0);
        });
      console.log("data");
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
      <Button onClick={() => handleClickOpen()}>
        <AddIcon />
      </Button>
      <Box sx={{ minWidth: 300 }}>
        <Dialog fullWidth={true} open={open} onClose={() => setOpen(false)}>
          <DialogTitle>Add city</DialogTitle>
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

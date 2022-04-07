import { useFormik } from "formik";
import {
  Button,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Typography,
} from "@mui/material";
import * as yup from "yup";
import { clientApi } from "../../../services/clientApi";
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { clearError, setError } from "../../../store/errorSlice";
import { response } from "msw";

interface Values {
  description: string;
  report_type_id: string;
}

interface Type {
  id: number;
  name: string;
}

const validationSchema = yup.object({
  description: yup
    .string()
    .min(10, "Description should be of minimum 8 characters length")
    .required("Description is required"),
  report_type_id: yup.string().required("Type is required"),
});

function CreateReportForm() {
  const jwt = useSelector((state: RootState) => state.user.user.jwt);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [reportTypes, setReportTypes] = useState([]);
  const { id } = useParams();

  const routeConsignmentCard = () => {
    navigate(`/warehouse-consignments/${id}`);
  };

  const formik = useFormik({
    initialValues: {
      description: "",
      report_type_id: "",
    },
    validationSchema: validationSchema,
    onSubmit: (data: Values) => {
      clientApi.report
        .create(id, jwt, data)
        .catch((err) => {
          if (err.response) {
            err.response.status === 500
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
        .then((response) => {
          dispatch(clearError());
          routeConsignmentCard();
        });
    },
  });

  useEffect(() => {
    clientApi.report
      .getListOfTypes(id, jwt)
      .catch((err) => {
        dispatch(setError([err.response.statusText]));
        console.log(err.response);
        return Promise.reject(err);
      })
      .then((response) => {
        dispatch(clearError());
        setReportTypes(response.data.ReportTypes);
      });
  }, [id]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormControl fullWidth>
        <InputLabel id="report_type_id">Type</InputLabel>
        <Select
          id="report_type_id"
          value={formik.values.report_type_id}
          label="report_type_id"
          name="report_type_id"
          onChange={formik.handleChange}
          sx={{ mb: 3 }}
        >
          {reportTypes.length &&
            reportTypes.map((type: Type) => (
              <MenuItem key={type.id} value={type.id}>
                {type.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <TextField
        fullWidth
        id="description"
        name="description"
        label="Description"
        multiline
        rows={4}
        value={formik.values.description}
        onChange={formik.handleChange}
        error={formik.touched.description && Boolean(formik.errors.description)}
        helperText={formik.touched.description && formik.errors.description}
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
    </form>
  );
}

export default CreateReportForm;

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

interface Values {
  description: string;
  report_type_id: string;
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

  console.log(reportTypes);

  return <Typography>Form is here</Typography>;
}

export default CreateReportForm;

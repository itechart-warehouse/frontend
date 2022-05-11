import { FormikProvider, useFormik } from "formik";
import {
  Button,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  Box,
  Paper,
} from "@mui/material";
import * as yup from "yup";
import { clientApi } from "../../../services/clientApi";
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { clearError } from "../../../store/errorSlice";
import { Goods, Values, Type } from "./CreateReport.types";
import useMount from "../../../services/isMountedHook";

const twinkleBlue = "#e9ecef";

const headStyle = {
  backgroundColor: twinkleBlue,
};

const rowStyle = {
  "&:last-child td, &:last-child th": { border: 0 },
};

const validationSchema = yup.object({
  description: yup
    .string()
    .min(10, "Description should be of minimum 8 characters length")
    .required("Description is required"),
  report_type_id: yup.string().required("Type is required"),
});

function CreateReportForm() {
  const [goods, setGoods] = useState<Goods[]>([]);
  const jwt = useSelector((state: RootState) => state.user.user.jwt);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [reportTypes, setReportTypes] = useState([]);
  const { id } = useParams();
  const isMounted = useMount();


  const routeConsignmentCard = () => {
    navigate(`/warehouse-consignments/${id}`);
  };

  const initialValues = {
    description: "",
    report_type_id: "",

    reported: goods.map((it) => ({
      id: it.id,
      name: it.name,
      quantity: "",
    })),
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (data: Values) => {
      clientApi.report
        .create(id, jwt, data)
        .then((response) => {
          dispatch(clearError());
          routeConsignmentCard();
        });
      console.log(data);
    },
  });

  useEffect(() => {
    clientApi.goods
      .getByConsignmentId(id, jwt)
      .then((response) => {
        if (isMounted()) {
          dispatch(clearError());
          setGoods(response.data.goods);
        }
      });
  }, []);

  useEffect(() => {
    clientApi.report
      .getListOfTypes(id, jwt)
      .then((response) => {
        if (isMounted()) {
          dispatch(clearError());
          setReportTypes(response.data.ReportTypes);
        }
      });
  }, [id]);

  return (
    <FormikProvider value={formik}>
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
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
          helperText={formik.touched.description && formik.errors.description}
          sx={{ mb: 3 }}
        />
        <TableContainer component={Paper} sx={{ marginBottom: "10px" }}>
          <Table sx={{ minWidth: 450 }} aria-label="usersPage table">
            <TableHead sx={headStyle}>
              <TableRow sx={rowStyle}>
                <TableCell>
                  <Typography variant="h6">Name</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Quantity</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Missed</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {goods.length && formik.values.reported.length ? (
                goods.map((good, index) => (
                  <TableRow key={good.id}>
                    <TableCell>{good.name}</TableCell>
                    <TableCell>{good.quantity}</TableCell>
                    <TableCell>
                      <TextField
                        key={good.id}
                        name={`reported[${index}].quantity`}
                        value={formik.values.reported[index].quantity}
                        onChange={formik.handleChange}
                      />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell>
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ display: "flex" }}>
          <Button
            color="warning"
            variant="outlined"
            fullWidth
            style={{ margin: "0 5px 10px 0" }}
            onClick={() => {
              routeConsignmentCard();
            }}
          >
            Cancel
          </Button>
          <Button
            color="success"
            variant="contained"
            fullWidth
            type="submit"
            style={{ margin: "0 0 10px 0" }}
          >
            Submit
          </Button>
        </Box>
      </form>
    </FormikProvider>
  );
}

export default CreateReportForm;

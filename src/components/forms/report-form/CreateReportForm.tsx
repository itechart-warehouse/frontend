import { FieldArray, FormikProvider, useFormik } from "formik";
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
} from "@mui/material";
import Paper from "@mui/material/Paper";
import * as yup from "yup";
import { clientApi } from "../../../services/clientApi";
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { clearError, setError } from "../../../store/errorSlice";

interface Values {
  description: string;
  report_type_id: string;
}

interface Type {
  id: number;
  name: string;
}

interface Goods {
  id: number;
  name: string;
  quantity: string;
  reported_quantity: string;
}

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
  const isMounted = useRef(false);

  const routeConsignmentCard = () => {
    navigate(`/warehouse-consignments/${id}`);
  };

  const initialValues = {
    description: "",
    report_type_id: "",
    reported_goods: goods.length ? [...goods] : [],
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (data: Values) => {
      // clientApi.report
      //   .create(id, jwt, data)
      //   .catch((err) => {
      //     if (err.response) {
      //       err.response.status === 500 || err.response.status === 401
      //         ? dispatch(setError([err.response.statusText]))
      //         : dispatch(setError([...err.response.data.user_errors]));
      //     } else if (err.request) {
      //       dispatch(setError(["Server is not working"]));
      //       console.log("request", err.request);
      //     } else {
      //       dispatch(setError([err.message]));
      //       console.log("message", err.message);
      //     }
      //     return Promise.reject(err);
      //   })
      //   .then((response) => {
      //     dispatch(clearError());
      //     routeConsignmentCard();
      //   });
      console.log(data);
    },
  });

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    clientApi.goods
      .getByConsignmentId(id, jwt)
      .catch((err) => {
        if (err.response) {
          dispatch(setError([err.response.statusText]));
          console.log("response", err.response.statusText);
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
        if (isMounted.current) {
          dispatch(clearError());
          setGoods(response.data.goods);
        }
      });
  }, []);

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
        <TableContainer component={Paper}>
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
              {/* Just for test - show formik initial values*/}
              {/*{formik.values.reported_goods.map((good) => (*/}
              {/*  <TableRow>*/}

              {/*    <TableCell>*/}
              {/*    </TableCell>*/}
              {/*  </TableRow>*/}
              {/*))}*/}

              <FieldArray
                name="reported_goods"
                render={() => (
                  <>
                    {formik.values.reported_goods.map((good, index) => (
                      <TableRow key={good.id}>
                        <TableCell>{good.name}</TableCell>
                        <TableCell>{good.quantity}</TableCell>
                        <TableCell>
                          <TextField
                            key={good.id}
                            name={`reported_goods[${index}].quantity`}
                            value={formik.values.reported_goods[index].quantity}
                            onChange={formik.handleChange}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </>
                )}
              />
            </TableBody>
          </Table>
        </TableContainer>

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
    </FormikProvider>
  );
}

export default CreateReportForm;

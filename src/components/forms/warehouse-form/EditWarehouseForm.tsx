import { useFormik } from "formik";
import {
  Button,
  FormControlLabel,
  Switch,
  TextField,
  Chip,
} from "@mui/material";
import * as yup from "yup";
import { clientApi } from "../../../services/clientApi";
import { useNavigate, useParams } from "react-router-dom";
import { clearError, setError } from "../../../store/errorSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { clearWarehouseState } from "../../../store/warehouseSlice";
import React from "react";
import InputMask from "react-input-mask";
import { Values } from "./EditWarehouse.types";

const validationSchema = yup.object({
  warehouseName: yup.string().required("Warehouse name is required"),
  warehouseAddress: yup.string().required("Warehouse address is required"),
  warehousePhone: yup
    .string()
    .test("len", "Invalid", (val = "") => {
      const val_length_without_dashes = val.replace(/-|_/g, "").length;
      return val_length_without_dashes === 15;
    })
    .required("Warehouse phone is required"),
});

function EditWarehouseForm() {
  const jwt = useSelector((state: RootState) => state.user.user.jwt);
  const warehouse = useSelector(
    (state: RootState) => state.warehouse.warehouse
  );
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      warehouseName: warehouse.name,
      warehouseAddress: warehouse.address,
      warehousePhone: warehouse.phone,
      warehouseArea: warehouse.area,
      active: warehouse.active,
    },
    validationSchema: validationSchema,
    onSubmit: (data: Values) => {
      clientApi.warehouse
        .editWarehouseById(id, data, jwt)
        .catch((err) => {
          if (err.response) {
            err.response.status === 500 || err.response.status === 401
              ? dispatch(setError([err.response.statusText]))
              : dispatch(setError([...err.response.data.warehouse_errors]));
          } else if (err.request) {
            dispatch(setError(["Server is not working"]));
            console.log("request", err.request);
          } else {
            dispatch(setError([err.message]));
            console.log("message", err.message);
          }
          return Promise.reject(err);
        })
        .then(() => {
          dispatch(clearError());
          dispatch(clearWarehouseState());
          routeWarehouseCard();
        });
    },
  });

  const routeWarehouseCard = () => {
    navigate(`/warehouse/${id}`);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        fullWidth
        id="warehouseName"
        name="warehouseName"
        label="Warehouse Name"
        value={formik.values.warehouseName}
        onChange={formik.handleChange}
        error={
          formik.touched.warehouseName && Boolean(formik.errors.warehouseName)
        }
        helperText={formik.touched.warehouseName && formik.errors.warehouseName}
        sx={{ mb: 3 }}
      />
      <InputMask
        mask="+375-(99)-9999999"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.warehousePhone}
      >
        {() => (
          <TextField
            type="text"
            label="Phone Number (Ex: +375-29-1234567)"
            name="warehousePhone"
            fullWidth
            variant="outlined"
            onChange={formik.handleChange}
            error={
              formik.touched.warehousePhone &&
              Boolean(formik.errors.warehousePhone)
            }
            helperText={
              formik.touched.warehousePhone && formik.errors.warehousePhone
            }
            sx={{ mb: 3 }}
          />
        )}
      </InputMask>
      <TextField
        fullWidth
        id="warehouseAddress"
        name="warehouseAddress"
        label="Warehouse Address"
        value={formik.values.warehouseAddress}
        onChange={formik.handleChange}
        error={
          formik.touched.warehouseAddress &&
          Boolean(formik.errors.warehouseAddress)
        }
        helperText={
          formik.touched.warehouseAddress && formik.errors.warehouseAddress
        }
        sx={{ mb: 3 }}
      />
      <TextField
        fullWidth
        id="warehouseArea"
        name="warehouseArea"
        label="Warehouse Area"
        value={formik.values.warehouseArea}
        onChange={formik.handleChange}
        error={
          formik.touched.warehouseArea && Boolean(formik.errors.warehouseArea)
        }
        helperText={formik.touched.warehouseArea && formik.errors.warehouseArea}
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
            <Chip label="Active warehouse" color="success" />
          ) : (
            <Chip label="Inactive warehouse" />
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
      <Button onClick={routeWarehouseCard} variant="outlined" fullWidth>
        Cancel
      </Button>
    </form>
  );
}

export default EditWarehouseForm;

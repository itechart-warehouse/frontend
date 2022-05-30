import React from "react";
import { Grid, Typography, Box, Alert } from "@mui/material";
import CreateWarehouseForm from "../../../components/forms/warehouse-form/CreateWarehouseForm";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { clearError } from "../../../store/errorSlice";

const CreateWarehousePage = () => {
  const error = useSelector((state: RootStateOrAny) => state.error.errors);
  const dispatch = useDispatch();
  const arr: unknown[] = [];
  setTimeout(() => dispatch(clearError()), 5000);
  const errorAlert = () => {
    if (error.length) {
      clearTimeout();
      Object.values(error[0]).map((err) => {
        arr.push(err);
      });
      return <Alert severity="error">{arr.join(",")}</Alert>;
    } else {
      return "";
    }
  };
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      <Box
        sx={{
          width: "100%",
          height: "60px",
          marginBottom: "10px",
          paddingTop: "10px",
        }}
      >
        {errorAlert()}
      </Box>
      <Grid item>
        <Typography
          variant="h2"
          component="div"
          gutterBottom
          color="primary"
          align="center"
        >
          Create warehouse
        </Typography>
        <Box sx={{ maxWidth: 500 }}>
          <CreateWarehouseForm />
        </Box>
      </Grid>
    </Grid>
  );
};

export default CreateWarehousePage;

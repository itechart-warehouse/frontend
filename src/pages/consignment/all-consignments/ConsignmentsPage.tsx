import {
  Typography,
  Container,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  Paper,
} from "@mui/material";
import { truckApi } from "../../../services/truckApi";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearError, setError } from "../../../store/errorSlice";
import { ConsignmentsType } from "./ConsignmentsPage.types";
import useMount from "../../../services/isMountedHook";

const mainContainerStyle = {
  pt: 3,
};

const titleStyle = {
  mb: 3,
};
const twinkleBlue = "#e9ecef";

const headStyle = {
  backgroundColor: twinkleBlue,
};

const rowStyle = {
  "&:last-child td, &:last-child th": { border: 0 },
};

function Consignments() {
  const [consignments, setConsignments] = useState<ConsignmentsType[]>([]);
  const dispatch = useDispatch();
  const isMounted = useMount();

  useEffect(() => {
    truckApi.consignment
      .getAll()
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
        if (isMounted()) {
          dispatch(clearError());
          setConsignments(response.data);
          console.log(response.data);
        }
      });
  }, []);

  return (
    <>
      <Container maxWidth="xl" sx={mainContainerStyle}>
        <Typography variant="h2" sx={titleStyle}>
          Consignments listing
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="usersPage table">
            <TableHead sx={headStyle}>
              <TableRow sx={rowStyle}>
                <TableCell>
                  <Typography variant="h6">Consignments</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Driver</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Car</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Bundle</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Status</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Contractor</Typography>
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {consignments.length ? (
                consignments.map((consignments) => {
                  if (consignments.status === "registered")
                    return (
                      <TableRow key={consignments.id}>
                        <TableCell component="th" scope="row">
                          <Link to={`${consignments.id}`}>
                            {consignments.consignment_seria}{" "}
                            {consignments.consignment_number}
                          </Link>
                        </TableCell>
                        <TableCell align="left" component="th" scope="row">
                          {consignments.driver.first_name}{" "}
                          {consignments.driver.second_name}{" "}
                          {consignments.driver.middle_name}
                        </TableCell>
                        <TableCell align="left" component="th" scope="row">
                          {consignments.truck.truck_number}
                        </TableCell>
                        <TableCell align="left" component="th" scope="row">
                          {consignments.bundle_seria}{" "}
                          {consignments.bundle_number}
                        </TableCell>
                        <TableCell align="left" component="th" scope="row">
                          {consignments.status}
                        </TableCell>
                        <TableCell align="left" component="th" scope="row">
                          {consignments.driver.company.name}
                        </TableCell>
                      </TableRow>
                    );
                })
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
      </Container>
    </>
  );
}

export default Consignments;

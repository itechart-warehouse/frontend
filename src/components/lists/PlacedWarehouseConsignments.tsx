import {
  Typography,
  Container,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearError, setError } from "../../store/errorSlice";
import { clientApi } from "../../services/clientApi";
import { RootState } from "../../store";

interface Consignments {
  id: number;
  status: string;
  bundle_seria: string;
  bundle_number: string;
  consignment_seria: string;
  consignment_number: string;
  first_name: string;
  second_name: string;
  contractor_name: string;
  truck_number: string;
}

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

function PlacedWarehouseConsignments() {
  const [consignments, setConsignments] = useState<Consignments[]>([]);
  const jwt = useSelector((state: RootState) => state.user.user.jwt);
  const dispatch = useDispatch();

  useEffect(() => {
    clientApi.consignment
      .getAll(jwt)
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
        dispatch(clearError());
        setConsignments(response.data.consignments);
        console.log(response.data.consignments);
      });
  }, []);
  return (
    <>
      <Container maxWidth="xl" sx={mainContainerStyle}>
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
              {consignments.map((consignments) => {
                if (consignments.status === "Placed")
                  return (
                    <TableRow key={consignments.id}>
                      <TableCell component="th" scope="row">
                        <Link to={`${consignments.id}`}>
                          {consignments.consignment_seria}{" "}
                          {consignments.consignment_number}
                        </Link>
                      </TableCell>
                      <TableCell align="left" component="th" scope="row">
                        {consignments.first_name} {consignments.second_name}{" "}
                      </TableCell>
                      <TableCell align="left" component="th" scope="row">
                        {consignments.truck_number}
                      </TableCell>
                      <TableCell align="left" component="th" scope="row">
                        {consignments.bundle_seria} {consignments.bundle_number}
                      </TableCell>
                      <TableCell align="left" component="th" scope="row">
                        {consignments.status}
                      </TableCell>
                      <TableCell align="left" component="th" scope="row">
                        {consignments.contractor_name}
                      </TableCell>
                    </TableRow>
                  );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}

export default PlacedWarehouseConsignments;

import {
  Typography,
  Container,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearError, setError } from "../../store/errorSlice";
import { clientApi } from "../../services/clientApi";
import { RootState } from "../../store";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { BabyChangingStation } from "@mui/icons-material";

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
  reported: boolean;
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

function RegistartedWarehouseConsignments() {
  const [consignments, setConsignments] = useState<Consignments[]>([]);
  const jwt = useSelector((state: RootState) => state.user.user.jwt);
  const dispatch = useDispatch();

  useEffect(() => {
    clientApi.consignment
      .getAll(jwt,'Registered')
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
                  <Typography align="center" variant="h6">
                    Driver
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography align="center" variant="h6">
                    Car
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography align="center" variant="h6">
                    Bundle
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography align="center" variant="h6">
                    Status
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography align="center" variant="h6">
                    Contractor
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography align="center" variant="h6">
                    Reports
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {consignments.map((consignment) => {
                if (consignment.status === "Registered")
                  return (
                    <TableRow key={consignment.id}>
                      <TableCell component="th" scope="row">
                        <Link to={`${consignment.id}`}>
                          {consignment.consignment_seria}{" "}
                          {consignment.consignment_number}
                        </Link>
                      </TableCell>
                      <TableCell align="center" component="th" scope="row">
                        {consignment.first_name} {consignment.second_name}{" "}
                      </TableCell>
                      <TableCell align="center" component="th" scope="row">
                        {consignment.truck_number}
                      </TableCell>
                      <TableCell align="center" component="th" scope="row">
                        {consignment.bundle_seria} {consignment.bundle_number}
                      </TableCell>
                      <TableCell align="center" component="th" scope="row">
                        {consignment.status}
                      </TableCell>
                      <TableCell align="center" component="th" scope="row">
                        {consignment.contractor_name}
                      </TableCell>
                      <TableCell align="center">
                        {consignment.reported ? (
                          <Button
                            href={`warehouse-consignments/${consignment.id}/reports`}
                          >
                            <ErrorOutlineIcon />
                          </Button>
                        ) : null}
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

export default RegistartedWarehouseConsignments;

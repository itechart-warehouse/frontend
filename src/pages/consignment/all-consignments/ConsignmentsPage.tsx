import {
    Typography,
    Container,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Button, Icon,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import {truckApi} from "../../../services/truckApi";
import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store";
import {clearError, setError} from "../../../store/errorSlice";

interface Consignments{
  id: number;
  status: string;
  bundle_seria: string;
  bundle_number: string;
  consignment_seria: string;
  consignment_number: string;
  truck:{
    truck_number: string;
    truck_type: {
      truck_type_name: string;
    }
  }
  driver  : {
    first_name: string;
    second_name: string;
    middle_name: string;
    birthday: string;
    passport: string;
    role:{
      role_name: string;
    }
    company:{
      name: string;
    }
  }
}

const mainContainerStyle = {
    pt: 3,
};

const titleStyle = {
    mb: 3,
};
  const twinkleBlue = '#e9ecef';

const headStyle = {
    backgroundColor: twinkleBlue,
};

const rowStyle = {
    "&:last-child td, &:last-child th": {border: 0},
};

function Consignments() {
  const [consignments, setConsignments] = useState<Consignments[]>([]);
  const dispatch = useDispatch();

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
        dispatch(clearError());
        setConsignments(response.data);
        console.log(response.data);
      });
  }, []);

  return (
    <>
      <Container maxWidth="xl" sx={mainContainerStyle}>
        <Typography variant="h2" sx={titleStyle}>
          Consignments listing
        </Typography>
        <TableContainer sx={{ width: 700 }} component={Paper}>
          <Table aria-label="usersPage table">
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
              {consignments.map((consignments) => (
                <TableRow key={consignments.id}>
                  <TableCell component="th" scope="row">
                    <Link to={`${consignments.id}`}>
                      {consignments.consignment_seria} {consignments.consignment_number}
                    </Link>
                  </TableCell>
                  <TableCell align="left" component="th" scope="row">
                    {consignments.driver.first_name} {consignments.driver.second_name} {consignments.driver.middle_name}
                  </TableCell>
                  <TableCell align="left" component="th" scope="row">
                    {consignments.truck.truck_number}
                  </TableCell>
                  <TableCell align="left" component="th" scope="row">
                    {consignments.bundle_seria} {consignments.bundle_number}
                  </TableCell>
                  <TableCell align="left" component="th" scope="row">
                    {consignments.status}
                  </TableCell>
                  <TableCell align="left" component="th" scope="row">
                    {consignments.driver.company.name}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}

export default Consignments;

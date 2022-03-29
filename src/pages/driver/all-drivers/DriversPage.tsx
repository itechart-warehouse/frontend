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
import { clientApi } from "../../../services/clientApi";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { clearError, setError } from "../../../store/errorSlice";
import AirlineSeatReclineNormalIcon from "@mui/icons-material/AirlineSeatReclineNormal";
import { truckApi } from "../../../services/truckApi";

interface Driver {
  id: string;
  first_name: string;
  second_name: string;
  company: {
    name: string;
  };
}

const twinkleBlue = "#e9ecef";

const headStyle = {
  backgroundColor: twinkleBlue,
};

const mainContainerStyle = {
  pt: 3,
};

const titleStyle = {
  mb: 3,
};

const rowStyle = {
  "&:last-child td, &:last-child th": { border: 0 },
};

function Drivers() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    truckApi.driver
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
        setDrivers(response.data);
        console.log(response.data);
      });
  }, []);

  return (
    <>
      <Container maxWidth="xl" sx={mainContainerStyle}>
        <Typography variant="h2" sx={titleStyle}>
          Drivers listing
        </Typography>
        <TableContainer sx={{ width: 500 }} component={Paper}>
          <Table aria-label="usersPage table">
            <TableHead sx={headStyle}>
              <TableRow sx={rowStyle}>
                <TableCell>
                  <Typography variant="h6">Driver</Typography>
                </TableCell>
                <TableCell>
                  {" "}
                  <Typography variant="h6">Contractor</Typography>
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {drivers.map((driver) => (
                <TableRow key={driver.id}>
                  <TableCell component="th" scope="row">
                    <Link to={`${driver.id}`}>
                      {driver.first_name} {driver.second_name}
                    </Link>
                  </TableCell>
                  <TableCell align="left" component="th" scope="row">
                    {driver.company.name}
                  </TableCell>
                  <TableCell>
                    <AirlineSeatReclineNormalIcon />
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

export default Drivers;

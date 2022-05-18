import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
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
  Grid,
} from "@mui/material";
import AirlineSeatReclineNormalIcon from "@mui/icons-material/AirlineSeatReclineNormal";
import { clearError } from "../../../store/errorSlice";
import { truckApi } from "../../../services/truckApi";
import { Driver } from "./DriversPage.types";
import useMount from "../../../services/isMountedHook";
import DriverCardImage from "../../../image/DriverCard.svg";
import * as React from "react";

const backgroundStyle = {
  height: "90vh",
  backgroundImage: `url(${DriverCardImage})`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right bottom",
  backgroundSize: "60%",
  marginRight: "20px",
};

const twinkleBlue = "#e9ecef";
const headStyle = { backgroundColor: twinkleBlue };
const mainContainerStyle = { pt: 3 };
const titleStyle = { mb: 3 };
const rowStyle = { "&:last-child td, &:last-child th": { border: 0 } };

function Drivers() {
  const [drivers, setDrivers] = React.useState<Driver[]>([]);
  const dispatch = useDispatch();
  const isMounted = useMount();

  React.useEffect(() => {
    truckApi.driver.getAll().then((response) => {
      if (isMounted()) {
        dispatch(clearError());
        setDrivers(response.data);
      }
    });
  }, []);

  return (
    <Grid sx={backgroundStyle}>
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
              {drivers.length ? (
                drivers.map((driver) => (
                  <TableRow key={driver.id}>
                    <TableCell component="th" scope="row">
                      <Link to={`${driver.id}`}>
                        {driver.first_name} {driver.second_name}
                      </Link>
                    </TableCell>
                    <TableCell align="left" component="th" scope="row">
                      {driver.company ? driver.company.name : "N/A"}
                    </TableCell>
                    <TableCell>
                      <AirlineSeatReclineNormalIcon />
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
      </Container>
    </Grid>
  );
}

export default Drivers;

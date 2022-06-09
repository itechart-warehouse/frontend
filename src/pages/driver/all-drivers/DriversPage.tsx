import * as React from "react";
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
  TablePagination,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearError } from "../../../store/errorSlice";
import AirlineSeatReclineNormalIcon from "@mui/icons-material/AirlineSeatReclineNormal";
import { truckApi } from "../../../services/truckApi";
import { Driver } from "./DriversPage.types";
import useMount from "../../../services/isMountedHook";
// @ts-ignore
import DriverCardImage from "../../../image/DriverCard.svg";
import Search from "../../../components/search/Search";

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
  const dispatch = useDispatch();
  const isMounted = useMount();
  const [drivers, setDrivers] = React.useState<Driver[]>([]);
  const [driversCount, setDriversCount] = React.useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(5);
  const [page, setPage] = React.useState<number>(0);

  React.useEffect(() => {
    truckApi.driver.getByPage(page, rowsPerPage.toString()).then((response) => {
      if (isMounted()) {
        dispatch(clearError());
        setDrivers(JSON.parse(response.data.drivers));
        setDriversCount(response.data.drivers_count);
      }
    });
  }, []);
  const handleChangePage = (event: unknown, newPage: number) => {
    truckApi.driver
      .getByPage(newPage, rowsPerPage.toString())
      .then((response) => {
        setDrivers(JSON.parse(response.data.drivers));
        setPage(newPage);
      });
  };

  const handleSubmitSearch = (search: string) => {
    if (search) {
      truckApi.driver.search(search).then((response) => {
        setDrivers(JSON.parse(response.data.drivers));
        setDriversCount(response.data.drivers_count);
      });
    } else {
      truckApi.driver.getByPage(0, rowsPerPage.toString()).then((response) => {
        setDrivers(JSON.parse(response.data.drivers));
        setDriversCount(response.data.drivers_count);
        setPage(0);
      });
    }
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    truckApi.driver.getByPage(0, event.target.value).then((response) => {
      setDrivers(JSON.parse(response.data.drivers));
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    });
  };
  return (
    <Grid sx={backgroundStyle}>
      <Container maxWidth="xl" sx={mainContainerStyle}>
        <Typography variant="h2" sx={titleStyle}>
          Drivers listing
        </Typography>
        <Grid container spacing={2} sx={{ justifyContent: "end" }}>
          <Grid item xs={4}>
            <Search handleSubmit={handleSubmitSearch} />
          </Grid>
        </Grid>
        <TableContainer component={Paper}>
          <Table aria-label="usersPage table">
            <TableHead sx={headStyle}>
              <TableRow sx={rowStyle}>
                <TableCell>
                  <Typography variant="h6">Driver</Typography>
                </TableCell>
                <TableCell>
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
                        {driver.first_name} {driver.middle_name}{" "}
                        {driver.second_name}
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
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={driversCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Container>
    </Grid>
  );
}

export default Drivers;

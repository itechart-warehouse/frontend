import * as React from "react";
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
  TablePagination,
  Grid,
} from "@mui/material";
import { truckApi } from "../../../services/truckApi";
import { clearError } from "../../../store/errorSlice";
import { ConsignmentsType } from "./ConsignmentsPage.types";
import useMount from "../../../services/isMountedHook";
import Search from "../../../components/search/Search";

const mainContainerStyle = { pt: 3 };
const titleStyle = { mb: 3 };
const twinkleBlue = "#e9ecef";
const headStyle = { backgroundColor: twinkleBlue };
const rowStyle = { "&:last-child td, &:last-child th": { border: 0 } };

function Consignments() {
  const dispatch = useDispatch();
  const isMounted = useMount();
  const [consCount, setConsCount] = React.useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(5);
  const [page, setPage] = React.useState<number>(0);
  const [consignments, setConsignments] = React.useState<ConsignmentsType[]>(
    []
  );

  React.useEffect(() => {
    truckApi.consignment
      .getByPage(page, rowsPerPage.toString())
      .then((response) => {
        if (isMounted()) {
          dispatch(clearError());
          setConsignments(JSON.parse(response.data.consignments));
          setConsCount(response.data.consignments_count);
        }
      });
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    truckApi.consignment
      .getByPage(newPage, rowsPerPage.toString())
      .then((response) => {
        setConsignments(JSON.parse(response.data.consignments));
        setPage(newPage);
      });
  };
  const handleSubmitSearch = (search: string) => {
    if (search) {
      truckApi.consignment.search(search).then((response) => {
        setConsignments(JSON.parse(response.data.consignments));
        setConsCount(response.data.consignments_count);
      });
    } else {
      truckApi.consignment
        .getByPage(0, rowsPerPage.toString())
        .then((response) => {
          setConsignments(JSON.parse(response.data.consignments));
          setConsCount(response.data.consignments_count);
          setPage(0);
        });
    }
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    truckApi.consignment.getByPage(0, event.target.value).then((response) => {
      setConsignments(JSON.parse(response.data.consignments));
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    });
  };
  return (
    <Container maxWidth="xl" sx={mainContainerStyle}>
      <Typography variant="h2" sx={titleStyle}>
        Consignments listing
      </Typography>
      <Grid container spacing={2} sx={{ justifyContent: "end" }}>
        <Grid item xs={4}>
          <Search handleSubmit={handleSubmitSearch} />
        </Grid>
      </Grid>
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
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {consignments.length ? (
              consignments.map((consignments) => {
                return (
                  <TableRow key={consignments.id}>
                    <TableCell component="th" scope="row">
                      <Link to={`${consignments.id}`}>
                        {consignments.consignment_seria}{" "}
                        {consignments.consignment_number}
                      </Link>
                    </TableCell>
                    <TableCell align="center" component="th" scope="row">
                      {consignments.driver.first_name}{" "}
                      {consignments.driver.second_name}{" "}
                      {consignments.driver.middle_name}
                    </TableCell>
                    <TableCell align="center" component="th" scope="row">
                      {consignments.truck.truck_number}
                    </TableCell>
                    <TableCell align="center" component="th" scope="row">
                      {consignments.bundle_seria} {consignments.bundle_number}
                    </TableCell>
                    <TableCell align="center" component="th" scope="row">
                      {consignments.status}
                    </TableCell>
                    <TableCell align="center" component="th" scope="row">
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
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={consCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Container>
  );
}

export default Consignments;

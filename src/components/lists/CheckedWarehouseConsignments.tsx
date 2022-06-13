import {
  Typography,
  Container,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button, TablePagination, Grid,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearError, setError } from "../../store/errorSlice";
import { clientApi } from "../../services/clientApi";
import { RootState } from "../../store";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import Search from "../search/Search";

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

function CheckedWarehouseConsignments() {
  const [consCount, setConsCount] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [page, setPage] = useState<number>(0);
  const [consignments, setConsignments] = useState<Consignments[]>([]);
  const jwt = useSelector((state: RootState) => state.user.user.jwt);
  const dispatch = useDispatch();

  useEffect(() => {
    clientApi.warehouseConsignment
      .getByPage(jwt,'Checked',page,rowsPerPage.toString())
      .then((response) => {
        dispatch(clearError());
        setConsignments(response.data.consignments);
        setConsCount(response.data.consignment_count)
      });
  }, []);
  const handleSubmitSearch = (text:string) => {
    if(text) {
      clientApi.consignment.search(jwt, text, 'Checked').then((response) => {
        setConsignments(response.data.consignments);
        setConsCount(response.data.consignment_count)
      })
    }
    else{
      clientApi.warehouseConsignment.getByPage(jwt,'Checked',0,rowsPerPage.toString()).then((response)=>{
        setConsignments(response.data.consignments);
        setConsCount(response.data.consignment_count)
        setPage(0);
      });
    }
  };
  const handleChangePage = (event: unknown, newPage: number) => {
    clientApi.warehouseConsignment.getByPage(jwt,'Checked',newPage,rowsPerPage.toString()).then((response)=>{
      setConsignments(response.data.consignments);
      setPage(newPage);
    })
  }
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    clientApi.warehouseConsignment.getByPage(jwt,'Checked',0,event.target.value).then((response)=>{
      setConsignments(response.data.consignments);
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    })
  };
  return (
    <>
      <Container maxWidth="xl" sx={mainContainerStyle}>
        <Grid container spacing={2}>
          <Grid item xs={8}></Grid>
          <Grid item xs={4}>
            <Search handleSubmit={handleSubmitSearch}/>
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
                <TableCell>
                  <Typography align="center" variant="h6">
                    Reports
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {consignments.map((consignment) => {
                if (consignment.status === "Checked")
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
    </>
  );
}

export default CheckedWarehouseConsignments;

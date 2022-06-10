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
  Grid, TablePagination,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearError } from "../../../store/errorSlice";
import DirectionsCarFilledTwoToneIcon from "@mui/icons-material/DirectionsCarFilledTwoTone";
import { truckApi } from "../../../services/truckApi";
import { Transport } from "./AllTransportPage.types";
// @ts-ignore
import TransportCardImage from "../../../image/TransportCard.svg";
import Search from "../../../components/search/Search";

const backgroundStyle = {
  height: "90vh",
  backgroundImage: `url(${TransportCardImage})`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right bottom",
  backgroundSize: "50%",
  marginRight: "20px",
};

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

function Transports() {
  const [transports, setTransports] = useState<Transport[]>([]);
  const [trucksCount, setTrucksCount] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [page, setPage] = useState<number>(0);
  const dispatch = useDispatch();

  useEffect(() => {
    truckApi.transports
      .getByPage(page,rowsPerPage.toString())
      .then((response) => {
        dispatch(clearError());
        setTransports(JSON.parse(response.data.trucks));
        setTrucksCount(JSON.parse(response.data.trucks_count))
      });
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    truckApi.transports.getByPage(newPage,rowsPerPage.toString()).then((response)=>{
      setTransports(JSON.parse(response.data.trucks));
      setPage(newPage);
    })
  }

  const handleSubmitSearch = (text:any) => {
    if(text.text) {
      truckApi.transports.search(text.text).then((response) => {
        setTransports(JSON.parse(response.data.trucks));
        setTrucksCount(JSON.parse(response.data.trucks_count))
      })
    }
    else{
      truckApi.transports.getByPage(0,rowsPerPage.toString()).then((response)=>{
        setTransports(JSON.parse(response.data.trucks));
        setTrucksCount(JSON.parse(response.data.trucks_count))
        setPage(0);
      });
    }
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    truckApi.transports.getByPage(0,event.target.value).then((response)=>{
      setTransports(JSON.parse(response.data.trucks));
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    })
  };

  return (
    <Grid sx={backgroundStyle}>
      <Container maxWidth="xl" sx={mainContainerStyle}>
        <Typography variant="h2" sx={titleStyle}>
          Transport listing
        </Typography>
        <Grid style={{ textAlign: 'right' }}> <Search handleSubmit={handleSubmitSearch}/></Grid>
        <TableContainer  component={Paper}>
          <Table aria-label="usersPage table">
            <TableHead sx={headStyle}>
              <TableRow sx={rowStyle}>
                <TableCell>
                  <Typography variant="h6">Transport</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Contractor</Typography>{" "}
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transports ? (
                transports.map((tr) => (
                  <TableRow key={tr.id}>
                    <TableCell component="th" scope="row">
                      <Link to={`/transport/${tr.id}`}>{tr.truck_number}</Link>
                    </TableCell>
                    <TableCell>{tr.company.name}</TableCell>
                    <TableCell>
                      <DirectionsCarFilledTwoToneIcon />
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
            count={trucksCount}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Container>
    </Grid>
  );
}

export default Transports;

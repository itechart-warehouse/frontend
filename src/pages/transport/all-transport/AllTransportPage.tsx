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
  Grid,
} from "@mui/material";
import DirectionsCarFilledTwoToneIcon from "@mui/icons-material/DirectionsCarFilledTwoTone";
import { clearError } from "../../../store/errorSlice";
import { truckApi } from "../../../services/truckApi";
import { Transport } from "./AllTransportPage.types";
// @ts-ignore
import TransportCardImage from "../../../image/TransportCard.svg";

const backgroundStyle = {
  height: "90vh",
  backgroundImage: `url(${TransportCardImage})`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right bottom",
  backgroundSize: "50%",
  marginRight: "20px",
};

const twinkleBlue = "#e9ecef";
const headStyle = { backgroundColor: twinkleBlue };
const mainContainerStyle = { pt: 3 };
const titleStyle = { mb: 3 };
const rowStyle = { "&:last-child td, &:last-child th": { border: 0 } };

function Transports() {
  const [transports, setTransports] = React.useState<Transport[]>([]);
  const dispatch = useDispatch();

  React.useEffect(() => {
    truckApi.transports.getAll().then((response) => {
      dispatch(clearError());
      setTransports(response.data);
    });
  }, []);

  return (
    <Grid sx={backgroundStyle}>
      <Container maxWidth="xl" sx={mainContainerStyle}>
        <Typography variant="h2" sx={titleStyle}>
          Transport listing
        </Typography>
        <TableContainer sx={{ width: 500 }} component={Paper}>
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
              {transports.length ? (
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
      </Container>
    </Grid>
  );
}

export default Transports;

import {
  Box,
  Typography,
  Container,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import { clientApi } from "../../../services/clientApi";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { clearError, setError } from "../../../store/errorSlice";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { linkStyle } from "../../../styles/linkStyle";
import ReportedGoodsDialog from "../../../components/dialogs/ReportedGoodsDialog";
import { Report } from "./ReportsPage.types";

const mainContainerStyle = {
  pt: 3,
};

const titleStyle = {
  display: "flex",
  alignItems: "center",
  mb: 3,
};

const rowStyle = {
  "&:last-child td, &:last-child th": { border: 0 },
};

function Reports() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const jwt = useSelector((state: RootState) => state.user.user.jwt);
  const [reports, setReports] = useState<Report[]>([]);
  useEffect(() => {
    clientApi.report
      .getAllByConsignmentId(id, jwt)
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
        setReports(response.data.reports);
      });
  }, [id]);

  const twinkleBlue = "#e9ecef";

  const headStyle = {
    backgroundColor: twinkleBlue,
  };

  return (
    <>
      <Container maxWidth="xl" sx={mainContainerStyle}>
        {reports.length ? (
          <Box sx={titleStyle}>
            <Link to={"/warehouse-consignments"} style={linkStyle}>
              <ArrowBackIcon fontSize="large" />{" "}
            </Link>
            <Typography variant="h2">
              Reports of {reports[0].consignment.consignment_seria}{" "}
              {reports[0].consignment.consignment_number}
            </Typography>
          </Box>
        ) : null}
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="companiesPage table">
            <TableHead sx={headStyle}>
              <TableRow sx={rowStyle}>
                <TableCell>
                  <Typography variant="h6">Type</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="h6">Description</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="h6">Date</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="h6">User</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6">Goods</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reports.length
                ? reports.map((rep: Report) => (
                    <TableRow key={rep.report.id}>
                      <TableCell component="th" scope="row">
                        {rep.report_type}
                      </TableCell>
                      <TableCell align="right">
                        {rep.report.description}
                      </TableCell>
                      <TableCell align="right">
                        {rep.report.report_date}
                      </TableCell>

                      <TableCell align="right">
                        {rep.user.first_name} {rep.user.last_name}
                      </TableCell>
                      <TableCell align="center">
                        <ReportedGoodsDialog reportId={rep.report.id} />
                      </TableCell>
                    </TableRow>
                  ))
                : ""}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}

export default Reports;

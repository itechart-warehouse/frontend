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
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { clearError, setError } from "../../../store/errorSlice";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

interface Report {
  report: {
    id: string;
    report_date: string;
    description: string;
    report_type: string;
  };
  report_type: {
    name: string;
  };
  user: {
    id: number;
    first_name: string;
    last_name: string;
  };
  consignment: {
    consignment_seria: string;
    consignment_number: string;
  };
}

const mainContainerStyle = {
  pt: 3,
};

const titleStyle = {
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
  }, []);

  const twinkleBlue = "#e9ecef";

  const headStyle = {
    backgroundColor: twinkleBlue,
  };
  return (
    <>
      <Container maxWidth="xl" sx={mainContainerStyle}>
        {reports.length ? (
          <Typography variant="h2" sx={titleStyle}>
            Reports of {reports[0].consignment.consignment_seria}{" "}
            {reports[0].consignment.consignment_number}
          </Typography>
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
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reports.map((rep) => (
                <TableRow key={rep.report.id}>
                  <TableCell component="th" scope="row">
                    {rep.report_type}
                  </TableCell>
                  <TableCell align="right">{rep.report.description}</TableCell>
                  <TableCell align="right">{rep.report.report_date}</TableCell>

                  <TableCell align="right">
                    {rep.user.first_name} {rep.user.last_name}
                  </TableCell>
                  <TableCell align="center"></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}

export default Reports;

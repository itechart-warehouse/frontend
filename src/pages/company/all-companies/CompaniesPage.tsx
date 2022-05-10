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
  Paper,
  Box,
  Grid,
} from "@mui/material";
import { clientApi } from "../../../services/clientApi";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { clearError } from "../../../store/errorSlice";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { Company } from "./CompaniesPage.types";
import useMount from "../../../services/isMountedHook";

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
// const gridStyle = {
//   height: "100vh",
//   backgroundImage: `url(${CompanyListImage})`,
//   backgroundRepeat: "no-repeat",
//   backgroundPosition: "center bottom",
//   opacity: 0.8,
// };

const rowStyle = {
  "&:last-child td, &:last-child th": { border: 0 },
};

function Companies() {
  const jwt = useSelector((state: RootState) => state.user.user.jwt);
  const role = useSelector((state: RootState) => state.user.userRole.name);
  const [companies, setCompanies] = useState<Company[]>([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMounted = useMount();

  useEffect(() => {
    clientApi.company.getAll(jwt).then((response) => {
      if (isMounted()) {
        dispatch(clearError());
        setCompanies(response.data.companies);
      }
    });
  }, []);

  const routeCreateCompany = () => {
    navigate("/company/create");
  };
  return (
    <>
      <Container maxWidth="xl" sx={mainContainerStyle}>
        <Typography variant="h2" sx={titleStyle}>
          Companies listing
        </Typography>
        {role === "System admin" ? (
          <Button
            onClick={routeCreateCompany}
            variant="contained"
            sx={{ mb: 3 }}
          >
            Create new company
          </Button>
        ) : (
          ""
        )}

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="companiesPage table">
            <TableHead sx={headStyle}>
              <TableRow sx={rowStyle}>
                <TableCell>
                  <Typography variant="h6">Company name</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6">Address</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6">Phone</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6">E-mail</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6">Status</Typography>
                </TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {companies.length &&
                companies.map((comp) => (
                  <TableRow key={comp.id}>
                    <TableCell component="th" scope="row">
                      <Link to={`${comp.id}`}>{comp.name}</Link>
                    </TableCell>
                    <TableCell align="center">{comp.address}</TableCell>
                    <TableCell align="center">{comp.phone}</TableCell>
                    <TableCell align="center">{comp.email}</TableCell>
                    <TableCell align="center">
                      {comp.active ? <CheckIcon /> : <CloseIcon />}
                    </TableCell>

                    <TableCell align="center">
                      <Button
                        variant="outlined"
                        href={`companies/${comp.id}/warehouses`}
                      >
                        Warehouses
                      </Button>
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

export default Companies;

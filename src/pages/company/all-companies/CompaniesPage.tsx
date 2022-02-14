import {
  Typography,
  Container,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody, Button,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { clientApi } from "../../../services/clientApi";
import React, { useEffect, useState } from "react";
import {Link, useNavigate} from "react-router-dom";

interface Company {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
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

function Companies() {
  const [companies, setCompanies] = useState<Company[]>([]);
  useEffect(() => {
    clientApi.company.getAll().then((response) => {
      setCompanies(response.data.companies);
    });
  }, []);

  const navigate = useNavigate();
  const routeCreateCompany = () => {
    navigate("/company/create");
  };
  return (
    <>
      <Container maxWidth="xl" sx={mainContainerStyle}>
        <Typography variant="h2" sx={titleStyle}>
          Companies listing
        </Typography>
        <Button onClick={routeCreateCompany} variant="contained" sx={{mb:3}}>
          Create new company
        </Button>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="companiesPage table">
            <TableHead>
              <TableRow sx={rowStyle}>
                <TableCell>Company name</TableCell>
                <TableCell align="right">Address</TableCell>
                <TableCell align="right">Phone</TableCell>
                <TableCell align="right">E-mail</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { companies.length && companies.map((comp) => (
                <TableRow key={comp.id}>
                  <TableCell component="th" scope="row">
                    <Link to={`${comp.id}`}>{comp.name}</Link>
                  </TableCell>
                  <TableCell align="right">{comp.address}</TableCell>
                  <TableCell align="right">{comp.phone}</TableCell>
                  <TableCell align="right">{comp.email}</TableCell>
                </TableRow>
              ))
              }
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}

export default Companies;

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
import { Link, useNavigate } from "react-router-dom";

interface Warehouse {
  id: number;
  name: string;
  address: string;
  phone: string;
  area: string;
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

function Warehouses() {
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  useEffect(() => {
    clientApi.warehouse.getAll().then((response) => {
      setWarehouses(response.data.warehouses);
    });
  }, []);

  const navigate = useNavigate();
  const routeCreateWarehouse = () => {
    navigate("/warehouse/create");
  };
  return (
    <>
      <Container maxWidth="xl" sx={mainContainerStyle}>
        <Typography variant="h2" sx={titleStyle}>
          Companies listing
        </Typography>
        <Button
          onClick={routeCreateWarehouse}
          variant="contained"
          sx={{ mb: 3 }}
        >
          Create new warehouse
        </Button>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="companiesPage table">
            <TableHead>
              <TableRow sx={rowStyle}>
                <TableCell>Warehouse name</TableCell>
                <TableCell align="right">Address</TableCell>
                <TableCell align="right">Phone</TableCell>
                <TableCell align="right">Area</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {warehouses.map((warehouse) => (
                <TableRow key={warehouse.id}>
                  <TableCell component="th" scope="row">
                    <Link to={`${warehouse.id}`}>{warehouse.name}</Link>
                  </TableCell>
                  <TableCell align="right">{warehouse.address}</TableCell>
                  <TableCell align="right">{warehouse.phone}</TableCell>
                  <TableCell align="right">{warehouse.area}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}

export default Warehouses;

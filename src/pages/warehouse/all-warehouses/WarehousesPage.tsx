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
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

interface Warehouse {
  warehouse: {
    id: number;
    name: string;
    address: string;
    phone: string;
    area: string;
  };
  user: {
    id: number;
    first_name: string;
    last_name: string;
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

function Warehouses() {
  const { id } = useParams();
  const jwt = useSelector((state: RootState) => state.user.user.jwt);
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  useEffect(() => {
    clientApi.warehouse.getAllByCompanyId(id, jwt).then((response) => {
      setWarehouses(response.data.warehouses);
      console.log(response.data.warehouses);
    });
  }, []);
  const navigate = useNavigate();
  const routeCreateWarehouse = () => {
    navigate("create");
  };
  return (
    <>
      <Container maxWidth="xl" sx={mainContainerStyle}>
        <Typography variant="h2" sx={titleStyle}>
          Warehouses listing
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
                <TableCell align="right">Admin</TableCell>
                <TableCell align="right">Area</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {warehouses.map((ware) => (
                <TableRow key={ware.warehouse.id}>
                  <TableCell component="th" scope="row">
                    <Link to={`${ware.warehouse.id}`}>
                      {ware.warehouse.name}
                    </Link>
                  </TableCell>
                  <TableCell align="right">{ware.warehouse.address}</TableCell>
                  <TableCell align="right">{ware.warehouse.phone}</TableCell>
                  <TableCell align="right">
                    <Link to={`/users/${ware.user.id}`}>
                      {ware.user.first_name} {ware.user.last_name}
                    </Link>
                  </TableCell>
                  <TableCell align="right">{ware.warehouse.area}</TableCell>
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

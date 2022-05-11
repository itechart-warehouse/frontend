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
} from "@mui/material";
import { clientApi } from "../../../services/clientApi";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { clearError, setError } from "../../../store/errorSlice";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { Warehouse, Company } from "./WarehousesPage.types";

const CompanyState = {
  name: "",
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

function Warehouses() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const jwt = useSelector((state: RootState) => state.user.user.jwt);
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [company, setCompany] = useState<Company>(CompanyState);
  useEffect(() => {
    clientApi.warehouse
      .getAllByCompanyId(id, jwt)
      .then((response) => {
        dispatch(clearError());
        setWarehouses(response.data.warehouses);
        setCompany(response.data.company);
        console.log(jwt);
      });
  }, []);

  const navigate = useNavigate();
  const routeCreateWarehouse = () => {
    navigate("create");
  };
  const twinkleBlue = "#e9ecef";

  const headStyle = {
    backgroundColor: twinkleBlue,
  };
  return (
    <>
      <Container maxWidth="xl" sx={mainContainerStyle}>
        <Typography variant="h2" sx={titleStyle}>
          Warehouses listing of company {company.name}
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
            <TableHead sx={headStyle}>
              <TableRow sx={rowStyle}>
                <TableCell>
                  <Typography variant="h6">Warehouse name</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6">Address</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6">Phone</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6">Admin</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6">Area</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6">Status</Typography>
                </TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {warehouses.map((ware) => (
                <TableRow key={ware.warehouse.id}>
                  <TableCell component="th" scope="row">
                    <Link to={`/warehouse/${ware.warehouse.id}`}>
                      {ware.warehouse.name}
                    </Link>
                  </TableCell>
                  <TableCell align="center">{ware.warehouse.address}</TableCell>
                  <TableCell align="center">{ware.warehouse.phone}</TableCell>
                  <TableCell align="center">
                    <Link to={`/users/${ware.user[0].id}`}>
                      {ware.user[0].first_name} {ware.user[0].last_name}
                    </Link>
                  </TableCell>
                  <TableCell align="center">{ware.warehouse.area}</TableCell>
                  <TableCell align="center">
                    {ware.warehouse.active ? <CheckIcon /> : <CloseIcon />}
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

export default Warehouses;

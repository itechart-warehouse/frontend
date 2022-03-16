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
  }[];
}
interface Company {
  name: string;
}

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
        setWarehouses(response.data.warehouses);
        setCompany(response.data.company);
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
                <TableCell>Section name</TableCell>
                <TableCell align="right">Address</TableCell>
                <TableCell align="right">Phone</TableCell>
                <TableCell align="right">Admin</TableCell>
                <TableCell align="right">Area</TableCell>
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
                  <TableCell align="right">{ware.warehouse.address}</TableCell>
                  <TableCell align="right">{ware.warehouse.phone}</TableCell>
                  <TableCell align="right">
                    <Link to={`/users/${ware.user[0].id}`}>
                      {ware.user[0].first_name} {ware.user[0].last_name}
                    </Link>
                  </TableCell>
                  <TableCell align="right">{ware.warehouse.area}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      href={`/warehouses/${ware.warehouse.id}/sections`}
                    >
                      Sections
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

export default Warehouses;

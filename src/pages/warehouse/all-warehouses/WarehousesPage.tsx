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
  Paper, TablePagination, Grid,
} from "@mui/material";
import { clientApi } from "../../../services/clientApi";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { clearError} from "../../../store/errorSlice";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { Warehouse, Company } from "./WarehousesPage.types";
import Search from "../../../components/search/Search";
import {styled} from "@mui/material/styles";

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
  const [warehousesCount, setWarehousesCount] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [page, setPage] = useState<number>(0);
  const [company, setCompany] = useState<Company>(CompanyState);
  useEffect(() => {
    clientApi.warehouse
      .getAllByCompanyId(id, jwt)
      .then((response) => {
        dispatch(clearError());
        setWarehouses(JSON.parse(response.data.warehouses));
        setWarehousesCount(response.data.warehouses_count)
        setCompany(JSON.parse(response.data.warehouses)[0].company.name)
      });
  }, []);

  const handleSubmitSearch = (text:string) => {
    if(text) {
      clientApi.warehouse.search(jwt, text, id).then((response) => {
        setWarehouses(JSON.parse(response.data.warehouses));
        setWarehousesCount(response.data.warehouses_count)
      })
    }
    else{
      clientApi.warehouse.getByPage(jwt,0,rowsPerPage.toString(),id).then((response)=>{
        setWarehouses(JSON.parse(response.data.warehouses));
        setWarehousesCount(response.data.warehouses_count)
        setPage(0);
      });
    }
  };


  const handleChangePage = (event: unknown, newPage: number) => {
    clientApi.warehouse.getByPage(jwt,newPage,rowsPerPage.toString(),id).then((response)=>{
      setWarehouses(JSON.parse(response.data.warehouses));
      setWarehousesCount(response.data.warehouses_count)
      setPage(newPage);
    })
  }
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    clientApi.warehouse.getAllByCompanyId(id, jwt).then((response)=>{
      setWarehouses(JSON.parse(response.data.warehouses));
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    })
  };
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
        <Grid container spacing={2}>
          <Grid item xs={8}>
              <Button
                onClick={routeCreateWarehouse}
                variant="contained"
                sx={{ mb: 3 }}
            >
              Create new warehouse
            </Button>
          </Grid>
          <Grid item xs={4}>
           <Search handleSubmit={handleSubmitSearch}/>
          </Grid>
        </Grid>
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
              {warehouses.map((warehouse) => (
                <TableRow key={warehouse.id}>
                  <TableCell component="th" scope="row">
                    <Link to={`/warehouse/${warehouse.id}`}>
                      {warehouse.name}
                    </Link>
                  </TableCell>
                  <TableCell align="center">{warehouse.address}</TableCell>
                  <TableCell align="center">{warehouse.phone}</TableCell>
                  <TableCell align="center">
                    <Link to={`/users/${warehouse.id}`}>
                      {warehouse.users[0].first_name} {warehouse.users[0].last_name}
                    </Link>
                  </TableCell>
                  <TableCell align="center">{warehouse.area}</TableCell>
                  <TableCell align="center">
                    {warehouse.active ? <CheckIcon /> : <CloseIcon />}
                  </TableCell>
                  <TableCell align="center"></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={warehousesCount}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Container>
    </>
  );
}

export default Warehouses;

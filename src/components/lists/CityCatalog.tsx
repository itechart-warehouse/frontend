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
  TablePagination,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearError } from "../../store/errorSlice";
import { clientApi } from "../../services/clientApi";
import { RootState } from "../../store";
import CityCatalogDialog from "../dialogs/CityCatalogDialog";
import DeleteIcon from "@mui/icons-material/Delete";
import EditCityDialog from "../dialogs/EditCityDialog";
import { Countries } from "../dialogs/CityCatalogDialog.types";

interface City {
  id: number;
  name: string;
  country_id: number;
}

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

const rowStyle = {
  "&:last-child td, &:last-child th": { border: 0 },
};

function CityCatalog() {
  const [cities, setCities] = useState<City[]>([]);
  const [consCount, setConsCount] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [page, setPage] = useState<number>(0);
  const [countries, setCountries] = useState<Countries[]>([]);
  const jwt = useSelector((state: RootState) => state.user.user.jwt);
  const country_id = useSelector(
    (state: RootState) => state.country.country.id
  );
  const dispatch = useDispatch();
  console.log(country_id);
  useEffect(() => {
    if (country_id > 0) {
      clientApi.city
        .getByPage(jwt, page, rowsPerPage.toString(), country_id)
        .then((response) => {
          dispatch(clearError());
          setCities(response.data.cities);
          setConsCount(response.data.city_count);
          console.log(response.data.cities);
        });
    }
  }, [country_id]);
  const handleChangePage = (event: unknown, newPage: number) => {
    clientApi.city
      .getByPage(jwt, newPage, rowsPerPage.toString(), country_id)
      .then((response) => {
        setCities(response.data.cities);
        setPage(newPage);
      });
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    clientApi.city
      .getByPage(jwt, 0, event.target.value, country_id)
      .then((response) => {
        setCities(response.data.cities);
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      });
  };

  const deleteCity = (id: number) => {
    clientApi.city.delete(jwt, id, country_id).then((response) => {
      dispatch(clearError());
      window.location.reload();
    });
  };
  useEffect(() => {
    clientApi.country.getAll(jwt).then((response) => {
      dispatch(clearError());
      setCountries(response.data.countries);
    });
  }, []);
  const country = countries.find((el) => el.id == String(country_id));
  return (
    <>
      <Container maxWidth="xl" sx={mainContainerStyle}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 300 }} aria-label="usersPage table">
            <TableHead sx={headStyle}>
              <TableRow sx={rowStyle}>
                <TableCell>
                  <Typography variant="h6">
                    Cities of {country ? country.name : ""}
                  </Typography>
                  <CityCatalogDialog />
                </TableCell>
                <TableCell />
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {cities.map((city) => (
                <TableRow key={city.id}>
                  <TableCell component="th" scope="row">
                    {city.name}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <EditCityDialog
                      cityId={city.id}
                      name={city.name}
                      country_id={city.country_id}
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<DeleteIcon />}
                      color="error"
                      onClick={() => deleteCity(city.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={consCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Container>
    </>
  );
}

export default CityCatalog;

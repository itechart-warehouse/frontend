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
  CircularProgress,
  Link,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearError } from "../../store/errorSlice";
import { clientApi } from "../../services/clientApi";
import { RootState } from "../../store";
import CountryCatalogDialog from "../dialogs/CountryCatalogDialog";
import DeleteIcon from "@mui/icons-material/Delete";
import EditCountryDialog from "../dialogs/EditCountryDialog";
import { setCountry } from "../../store/countrySlice";

interface Country {
  id: number;
  name: string;
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

function CountryCatalog() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [consCount, setConsCount] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [page, setPage] = useState<number>(0);
  const jwt = useSelector((state: RootState) => state.user.user.jwt);
  const dispatch = useDispatch();

  useEffect(() => {
    clientApi.country
      .getByPage(jwt, page, rowsPerPage.toString())
      .then((response) => {
        dispatch(clearError());
        setCountries(response.data.countries);
        setConsCount(response.data.country_count);
        // console.log(response.data.countries);
      });
  }, []);

  const deleteCountry = (id: number) => {
    clientApi.country.delete(jwt, id).then((response) => {
      dispatch(clearError());
      window.location.reload();
    });
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    clientApi.country
      .getByPage(jwt, newPage, rowsPerPage.toString())
      .then((response) => {
        setCountries(response.data.countries);
        setPage(newPage);
      });
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    clientApi.country.getByPage(jwt, 0, event.target.value).then((response) => {
      setCountries(response.data.countries);
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    });
  };

  // const getCittiesForCountry = (country_id: number) => {
  //   clientApi.city
  //     .getByPage(jwt, page, rowsPerPage.toString(), country_id)
  //     .then((response) => {
  //       dispatch(setCity(response.data.cities));
  //       dispatch(clearError());
  //       console.log("from back", response.data.cities);
  //     });
  // };

  return (
    <>
      <Container maxWidth="xl" sx={mainContainerStyle}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 300 }} aria-label="usersPage table">
            <TableHead sx={headStyle}>
              <TableRow sx={rowStyle}>
                <TableCell>
                  <Typography variant="h6">Countries</Typography>
                  <CountryCatalogDialog />
                </TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {countries.map((country) => (
                <TableRow key={country.id}>
                  <TableCell component="th" scope="row">
                    <Link onClick={() => dispatch(setCountry(country.id))}>
                      {country.name}
                    </Link>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<DeleteIcon />}
                      color="error"
                      onClick={() => deleteCountry(country.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <EditCountryDialog
                      countryId={country.id}
                      name={country.name}
                    />
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

export default CountryCatalog;

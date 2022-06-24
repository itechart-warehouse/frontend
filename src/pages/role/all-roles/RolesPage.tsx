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
  Grid, TablePagination,
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { clientApi } from "../../../services/clientApi";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { clearError } from "../../../store/errorSlice";
import { Role } from "./RolesPage.types";
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

const rowStyle = {
  "&:last-child td, &:last-child th": { border: 0 },
};

function Roles() {
  const jwt = useSelector((state: RootState) => state.user.user.jwt);
  const dispatch = useDispatch();
  const isMounted = useMount();
  const [roles, setRoles] = useState<Role[]>([]);

  useEffect(() => {
    clientApi.roles.getAll(jwt).then((response) => {
      if (isMounted()) {
        dispatch(clearError());
        setRoles(response.data.roles);
      }
    });
  }, []);

  const deleteRole = (id) => {
    return function () {
      clientApi.roles
        .delete(id, jwt);
    }
};


  return (
    <>
      <Container  sx={{ minWidth: 450, maxWidth: 900, mainContainerStyle}}>
        <Typography variant="h2" sx={titleStyle}>
          Roles listing
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 450}} aria-label="companiesPage table">
            <TableHead sx={headStyle}>
              <TableRow sx={rowStyle}>
                <TableCell>
                  <Typography variant="h6" align="left">Role name</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" align="left">Company</Typography>
                </TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {roles.length &&
                roles.map((role) => (
                  <TableRow key={role.id}>
                    <TableCell component="th" scope="row">
                      <Link to={`${role[0].id}`}>{role[0].name}</Link>
                    </TableCell>
                    <TableCell>
                      <Typography align="left">{role[1]}</Typography>
                    </TableCell>
                    <TableCell align="right">
                    <Button
                      variant="contained"
                      href={`roles/${role[0].id}/users`}
                      disabled
                    >
                      Users
                    </Button>
                    </TableCell>
                    <TableCell align="center">
                    <Button
                      variant="outlined"
                      startIcon={<DeleteIcon />}
                      color="error"
                      onClick={deleteRole(role[0].id)}
                    >
                     Delete
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

export default Roles;

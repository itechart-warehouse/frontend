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
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { clearError } from "../../../store/errorSlice";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { User } from "./UsersPage.types";

const twinkleBlue = "#e9ecef";

const headStyle = {
  backgroundColor: twinkleBlue,
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

function Users() {
  const jwt = useSelector((state: RootState) => state.user.user.jwt);
  const [users, setUsers] = useState<User[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    clientApi.user
      .getAll(jwt)
      .then((response) => {
        dispatch(clearError());
        setUsers(response.data.users);
      });
  }, []);

  const navigate = useNavigate();
  const routeCreateUser = () => {
    navigate("/user/create");
  };

  return (
    <>
      <Container maxWidth="xl" sx={mainContainerStyle}>
        <Typography variant="h2" sx={titleStyle}>
          Users listing
        </Typography>
        <Button onClick={routeCreateUser} variant="contained" sx={{ mb: 3 }}>
          Create new user
        </Button>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="usersPage table">
            <TableHead sx={headStyle}>
              <TableRow sx={rowStyle}>
                <TableCell>
                  <Typography variant="h6">User name</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6">Address</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6">Company</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6">Role</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6">E-mail</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6">Status</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell component="th" scope="row">
                    <Link to={`${user.id}`}>
                      {user.first_name} {user.last_name}
                    </Link>
                  </TableCell>
                  <TableCell align="center">{user.address}</TableCell>
                  <TableCell align="center">{user.company.name}</TableCell>
                  <TableCell align="center">{user.user_role.name}</TableCell>
                  <TableCell align="center">{user.email}</TableCell>
                  <TableCell align="center">
                    {user.active ? <CheckIcon /> : <CloseIcon />}
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

export default Users;

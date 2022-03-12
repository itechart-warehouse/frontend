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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import {clearError, setError} from "../../../store/errorSlice";

interface User {
  user: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    address: string;
  };

  company: {
    name: string;
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

function Users() {
  const jwt = useSelector((state: RootState) => state.user.user.jwt);
  const [users, setUsers] = useState<User[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    clientApi.user
      .getAll(jwt)
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
            <TableHead>
              <TableRow sx={rowStyle}>
                <TableCell>User name</TableCell>
                <TableCell align="right">Address</TableCell>
                <TableCell align="right">Company</TableCell>
                <TableCell align="right">E-mail</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((item) => (
                <TableRow key={item.user.id}>
                  <TableCell component="th" scope="row">
                    <Link to={`${item.user.id}`}>
                      {item.user.first_name} {item.user.last_name}
                    </Link>
                  </TableCell>
                  <TableCell align="right">{item.user.address}</TableCell>
                  <TableCell align="right">{item.company.name}</TableCell>
                  <TableCell align="right">{item.user.email}</TableCell>
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

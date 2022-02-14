import {
  Typography,
  Container,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { clientApi } from "../../../services/clientApi";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  address: string;
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
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    clientApi.user.getAll().then((response) => {
      setUsers(response.data.users);
      console.log(response.data.users);
    });
  }, []);
  return (
    <>
      <Container maxWidth="xl" sx={mainContainerStyle}>
        <Typography variant="h2" sx={titleStyle}>
          Users listing
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="usersPage table">
            <TableHead>
              <TableRow sx={rowStyle}>
                <TableCell>User name</TableCell>
                <TableCell align="right">Address</TableCell>
                <TableCell align="right">E-mail</TableCell>
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
                  <TableCell align="right">{user.address}</TableCell>
                  <TableCell align="right">{user.email}</TableCell>
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

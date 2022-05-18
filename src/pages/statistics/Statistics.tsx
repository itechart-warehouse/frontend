import * as React from "react";
import { User } from "../user/all-users/UsersPage.types";
import { useDispatch, useSelector } from "react-redux";
import { clientApi } from "../../services/clientApi";
import { clearError } from "../../store/errorSlice";
import { RootState } from "../../store";
import {
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

const twinkleBlue = "#e9ecef";
const headStyle = { backgroundColor: twinkleBlue };
const mainContainerStyle = { pt: 3 };
const titleStyle = { mb: 3 };
const rowStyle = { "&:last-child td, &:last-child th": { border: 0 } };

const Statistics = () => {
  const jwt = useSelector((state: RootState) => state.user.user.jwt);
  const [users, setUsers] = React.useState<User[]>([]);
  const dispatch = useDispatch();

  React.useEffect(() => {
    clientApi.user.getAll(jwt).then((response) => {
      dispatch(clearError());
      setUsers(response.data.users);
    });
  }, []);

  return (
    <Container maxWidth="xl" sx={mainContainerStyle}>
      <Typography variant="h2" sx={titleStyle}>
        Users actions
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="usersPage table">
          <TableHead sx={headStyle}>
            <TableRow sx={rowStyle}>
              <TableCell>
                <Typography variant="h6">User name</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6">Data</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6">Actions</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((item) => (
              <TableRow key={item.user.id}>
                <TableCell component="th" scope="row">
                  {item.user.first_name} {item.user.last_name}
                </TableCell>
                <TableCell align="center">data</TableCell>
                <TableCell align="center">action</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Statistics;

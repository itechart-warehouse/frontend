import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
  TablePagination,
  Grid,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { clientApi } from "../../../services/clientApi";
import { RootState } from "../../../store";
import { clearError } from "../../../store/errorSlice";
import { User } from "./UsersPage.types";
import Search from "../../../components/search/Search";

const twinkleBlue = "#e9ecef";
const headStyle = { backgroundColor: twinkleBlue };
const mainContainerStyle = { pt: 3 };
const titleStyle = { mb: 3 };
const rowStyle = { "&:last-child td, &:last-child th": { border: 0 } };

function Users() {
  const jwt = useSelector((state: RootState) => state.user.user.jwt);
  const role = useSelector((state: RootState) => state.user.userRole.name);
  const [usersCount, setUsersCount] = React.useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(5);
  const [page, setPage] = React.useState<number>(0);
  const [users, setUsers] = React.useState<User[]>([]);
  const dispatch = useDispatch();

  React.useEffect(() => {
    clientApi.user.getAll(jwt).then((response) => {
      dispatch(clearError());
      setUsers(JSON.parse(response.data.users));
      setUsersCount(response.data.users_count);
    });
  }, []);
  const navigate = useNavigate();
  const routeCreateUser = () => {
    navigate("/user/create");
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    clientApi.user
      .getByPage(jwt, newPage, rowsPerPage.toString())
      .then((response) => {
        setUsers(JSON.parse(response.data.users));
        setPage(newPage);
      });
  };
  const handleSubmitSearch = (search: string) => {
    if (search) {
      clientApi.user.search(jwt, search).then((response) => {
        setUsers(JSON.parse(response.data.users));
        setUsersCount(response.data.users_count);
      });
    } else {
      clientApi.user
        .getByPage(jwt, 0, rowsPerPage.toString())
        .then((response) => {
          setUsers(JSON.parse(response.data.users));
          setUsersCount(response.data.users_count);
          setPage(0);
        });
    }
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    clientApi.user.getByPage(jwt, 0, event.target.value).then((response) => {
      setUsers(JSON.parse(response.data.users));
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    });
  };
  return (
    <Container maxWidth="xl" sx={mainContainerStyle}>
      <Typography variant="h2" sx={titleStyle}>
        Users listing
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={8}>
         {role === "Warehouse admin" ? (
           <Button onClick={routeCreateUser} variant="contained" sx={{ mb: 3 }}>
             Create new user
           </Button>
         ) : (
           ""
         )}
        </Grid>
        <Grid item xs={4}>
          <Search handleSubmit={handleSubmitSearch} label={'last name and first name...'}/>
        </Grid>
      </Grid>
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
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={usersCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Container>
  );
}

export default Users;

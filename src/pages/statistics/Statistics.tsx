import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { User } from "../user/all-users/UsersPage.types";
import { clientApi } from "../../services/clientApi";
import { clearError } from "../../store/errorSlice";
import { RootState } from "../../store";
import { statisticsSortTable, statisticsTable } from "./statisticsField";
import { getComparator, Order, stableSort } from "./stableSort";
import { Statistiic } from "./statistics.types";

const twinkleBlue = "#e9ecef";
const headStyle = { backgroundColor: twinkleBlue };
const mainContainerStyle = { pt: 3 };
const titleStyle = { mb: 3 };
const rowStyle = { "&:last-child td, &:last-child th": { border: 0 } };

const Statistics = () => {
  const jwt = useSelector((state: RootState) => state.user.user.jwt);
  const [users, setUsers] = React.useState<User[]>([]);
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Statistiic>("user");
  const dispatch = useDispatch();

  React.useEffect(() => {
    clientApi.user.getAll(jwt).then((response) => {
      dispatch(clearError());
      setUsers(response.data.users);
    });
  }, []);

  const handleRequestSort = (event, property: keyof Statistiic) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const createSortHandler =
    (property) => (event: React.MouseEvent<unknown>) => {
      handleRequestSort(event, property);
    };

  return (
    <Container maxWidth="xl" sx={mainContainerStyle}>
      <Typography variant="h2" sx={titleStyle}>
        Users actions
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="usersPage table">
          <TableHead sx={headStyle}>
            <TableRow sx={rowStyle}>
              {statisticsSortTable.map((cell) => (
                <TableCell
                  key={cell.id}
                  align={cell.align}
                  sortDirection={orderBy === cell.id ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === cell.id}
                    direction={orderBy === cell.id ? order : "asc"}
                    onClick={createSortHandler(cell.id)}
                  >
                    <Typography variant="h6">{cell.title}</Typography>
                    {orderBy === cell.id ? (
                      <Box component="span" sx={visuallyHidden}>
                        {order === "desc"
                          ? "sorted descending"
                          : "sorted ascending"}
                      </Box>
                    ) : null}
                  </TableSortLabel>
                </TableCell>
              ))}
              {statisticsTable.map((cell) => (
                <TableCell key={cell.id} align={cell.align}>
                  <Typography variant="h6">{cell.title}</Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {stableSort(users, getComparator(order, orderBy)).map((item) => (
              <TableRow key={item.user.id}>
                <TableCell align="left">
                  {item.user.first_name} {item.user.last_name}
                </TableCell>
                <TableCell align="center">date</TableCell>
                <TableCell align="center">{item.company.name}</TableCell>
                <TableCell align="right">activity</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Statistics;

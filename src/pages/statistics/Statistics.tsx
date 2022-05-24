import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as dayjs from "dayjs";
import * as isSameOrAfter from "dayjs/plugin/isSameOrAfter";
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
import { clientApi } from "../../services/clientApi";
import { clearError } from "../../store/errorSlice";
import { RootState } from "../../store";
import { UserLogs } from "./statistics.type";
import { statisticsSortTable, statisticsTable } from "./statisticsField";
import { getComparator, Order, stableSort } from "./stableSort";
import FilterBar from "./FilterBar";

dayjs.extend(isSameOrAfter);

const twinkleBlue = "#e9ecef";
const headStyle = { backgroundColor: twinkleBlue };
const mainContainerStyle = { pt: 3 };
const titleStyle = { mb: 3 };
const rowStyle = { "&:last-child td, &:last-child th": { border: 0 } };

const Statistics = () => {
  const jwt = useSelector((state: RootState) => state.user.user.jwt);
  const [userLogs, setUserLogs] = React.useState<UserLogs[]>([]);
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof UserLogs>("username");
  const dispatch = useDispatch();

  React.useEffect(() => {
    clientApi.statistics.getAll(jwt).then((response) => {
      dispatch(clearError());
      setUserLogs(response.data.warehouse_audits);
    });
  }, []);

  console.log(userLogs);

  const handleRequestSort = (event, property: keyof UserLogs) => {
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h2" sx={titleStyle}>
          Users actions
        </Typography>
        <FilterBar />
      </div>
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
            {stableSort(userLogs, getComparator(order, orderBy)).map((item) => (
              <TableRow key={item.id}>
                <TableCell align="left">{item.username}</TableCell>
                <TableCell align="center">{item.data}</TableCell>
                <TableCell align="center">{item.company}</TableCell>
                <TableCell align="center">{item.action}</TableCell>
                <TableCell align="center">{item.type}</TableCell>
                <TableCell align="right">{item.changes.name}</TableCell>
              </TableRow>
            ))}
            {/*  BUG: CHANGES COLUMN DOESN'T SHOW ALL CHANGES */}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Statistics;

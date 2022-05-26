import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as dayjs from "dayjs";
import * as isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import {
  Box,
  CircularProgress,
  Container,
  Divider,
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
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
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
const rowChangeStyle = {
  "&:last-child td, &:last-child th": { border: 0 },
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

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
            {!userLogs ? (
              <TableRow>
                <TableCell>
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : (
              stableSort(userLogs, getComparator(order, orderBy)).map(
                (item) => (
                  <TableRow key={item.id}>
                    <TableCell align="center">
                      <Typography variant="body1">{item.username}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="body1">{item.data}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="body1">{item.company}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="body1">{item.action}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="body1">{item.type}</Typography>
                    </TableCell>
                    <TableCell align="center" style={{ width: "50%" }}>
                      <TableContainer component={Paper}>
                        {Object.keys(item.changes).map((it) => (
                          <Table
                            key={it}
                            aria-label="simple table"
                            style={{ tableLayout: "fixed" }}
                          >
                            <TableBody>
                              {Array.isArray(item.changes[it]) ? (
                                <TableRow sx={rowChangeStyle}>
                                  <TableCell
                                    align="center"
                                    sx={{ flex: "3 0 20px" }}
                                  >
                                    {it}
                                  </TableCell>
                                  <TableCell
                                    align="center"
                                    sx={{ flex: "3 0 20px" }}
                                  >
                                    {item.changes[it][0]}
                                  </TableCell>
                                  <div style={{ flex: "3 0 20px" }}>
                                    <ArrowForwardIcon />
                                  </div>
                                  <TableCell
                                    align="center"
                                    sx={{ flex: "3 0 20px" }}
                                  >
                                    {item.changes[it][1]}
                                  </TableCell>
                                </TableRow>
                              ) : null}
                            </TableBody>
                          </Table>
                        ))}
                      </TableContainer>
                    </TableCell>
                  </TableRow>
                )
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Statistics;

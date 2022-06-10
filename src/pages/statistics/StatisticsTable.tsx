import * as React from "react";
import {
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import { getComparator, Order, stableSort } from "./utils/stableSort";
import { StatisticsType, UserLogs } from "./type/statistics.type";
import { statisticsSortTable, statisticsTable } from "./utils/statisticsField";
import { visuallyHidden } from "@mui/utils";
import StatisticsAccordion from "./StatisticsAccordion";
import { clientApi } from "../../services/clientApi";

const twinkleBlue = "#e9ecef";
const headStyle = { backgroundColor: twinkleBlue };
const rowStyle = { "&:last-child td, &:last-child th": { border: 0 } };

const StatisticsTable: React.FC<StatisticsType> = (props: StatisticsType) => {
  const {
    jwt,
    page,
    setPage,
    userLogs,
    setUserLogs,
    logsCount,
    rowsPerPage,
    setRowsPerPage,
    filters,
    startDate,
    endDate,
  } = props;

  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof UserLogs>("username");

  const handleRequestSort = (event, property: keyof UserLogs) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const createSortHandler =
    (property) => (event: React.MouseEvent<unknown>) => {
      handleRequestSort(event, property);
    };

  const handleChangePage = (event: unknown, newPage: number) => {
    clientApi.statistics
      .getAll(
        jwt,
        page,
        rowsPerPage.toString(),
        filters,
        String(startDate),
        String(endDate)
      )
      .then((response) => {
        setUserLogs(response.data.statistic.warehouse_audits);
        setPage(newPage);
      });
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    clientApi.statistics
      .getAll(
        jwt,
        0,
        event.target.value,
        filters,
        String(startDate),
        String(endDate)
      )
      .then((response) => {
        setUserLogs(response.data.statistic.warehouse_audits);
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      });
  };

  return (
    <div>
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
            {userLogs.length === 0 ? (
              <TableRow>
                <TableCell align="center" colSpan={6}>
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
                    <TableCell align="center" style={{ width: "45%" }}>
                      <StatisticsAccordion item={item} />
                    </TableCell>
                  </TableRow>
                )
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={logsCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default StatisticsTable;

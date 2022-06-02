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
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import { getComparator, Order, stableSort } from "./utils/stableSort";
import { StatisticsType, UserLogs } from "./type/statistics.type";
import { statisticsSortTable, statisticsTable } from "./utils/statisticsField";
import { visuallyHidden } from "@mui/utils";
import StatisticsAccordion from "./StatisticsAccordion";

const twinkleBlue = "#e9ecef";
const headStyle = { backgroundColor: twinkleBlue };
const rowStyle = { "&:last-child td, &:last-child th": { border: 0 } };

const StatisticsTable: React.FC<StatisticsType> = (props: StatisticsType) => {
  const { userLogs } = props;
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

  return (
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
            stableSort(userLogs, getComparator(order, orderBy)).map((item) => (
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
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StatisticsTable;

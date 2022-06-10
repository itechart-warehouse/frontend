import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Typography } from "@mui/material";
import { RootState } from "../../store";
import { UserLogs } from "./type/statistics.type";
import FilterBar from "./FilterBar";
import StatisticsTable from "./StatisticsTable";
import { clientApi } from "../../services/clientApi";
import { clearError } from "../../store/errorSlice";
import useMount from "../../services/isMountedHook";
import { useDebouncedEffect } from "./hook/useDebounceEffect";

const mainContainerStyle = { pt: 3 };
const titleStyle = { mb: 3 };

const Statistics = () => {
  const jwt = useSelector((state: RootState) => state.user.user.jwt);
  const dispatch = useDispatch();
  const isMounted = useMount();
  const [userLogs, setUserLogs] = React.useState<UserLogs[]>([]);
  const [searchName, setSearchName] = React.useState("");
  const [actionData, setActionData] = React.useState("");
  const [startDate, setStartDate] = React.useState<Date | string>("");
  const [endDate, setEndDate] = React.useState<Date | string>(new Date());
  const [debounced, setDebounced] = React.useState("");
  const [logsCount, setLogsCount] = React.useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(5);
  const [page, setPage] = React.useState<number>(0);
  const [filters, setFilters] = React.useState({
    name: searchName,
    action: actionData,
  });

  useDebouncedEffect(
    () => {
      setDebounced(searchName);
    },
    [searchName],
    500
  );

  React.useEffect(() => {
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
        if (isMounted()) {
          dispatch(clearError());
          const statistics = response.data.statistic.warehouse_audits;
          setUserLogs(statistics);
          setLogsCount(response.data.warehouse_audits_count);
        }
      });
  }, [page, actionData, startDate, endDate, debounced]);

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
      </div>
      <FilterBar
        filters={filters}
        setFilters={setFilters}
        setSearchName={setSearchName}
        setActionData={setActionData}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />
      <StatisticsTable
        jwt={jwt}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        userLogs={userLogs}
        setUserLogs={setUserLogs}
        logsCount={logsCount}
        filters={filters}
        startDate={startDate}
        endDate={endDate}
      />
    </Container>
  );
};

export default Statistics;

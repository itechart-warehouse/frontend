import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Typography } from "@mui/material";
import { clientApi } from "../../services/clientApi";
import { clearError } from "../../store/errorSlice";
import { RootState } from "../../store";
import { UserLogs } from "./type/statistics.type";
import FilterBar from "./FilterBar";
import StatisticsTable from "./StatisticsTableBody";

const mainContainerStyle = { pt: 3 };
const titleStyle = { mb: 3 };

const Statistics = () => {
  const dispatch = useDispatch();
  const jwt = useSelector((state: RootState) => state.user.user.jwt);
  const [userLogs, setUserLogs] = React.useState<UserLogs[]>([]);

  React.useEffect(() => {
    clientApi.statistics.getAll(jwt).then((response) => {
      dispatch(clearError());
      setUserLogs(response.data.warehouse_audits);
    });
  }, []);

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
      <FilterBar jwt={jwt} setUserLogs={setUserLogs} />
      <div style={{ display: "flex", columnGap: "30px" }}>
        <StatisticsTable userLogs={userLogs} />
      </div>
    </Container>
  );
};

export default Statistics;

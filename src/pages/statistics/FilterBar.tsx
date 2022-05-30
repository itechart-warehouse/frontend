import * as React from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { clientApi } from "../../services/clientApi";
import { useNavigate } from "react-router-dom";
import { filterData } from "./filterBar.type";

export default function BasicDateRangePicker({ jwt, setUserLogs }) {
  const [searchName, setSearchName] = React.useState("");
  const [actionData, setActionData] = React.useState(null);
  const [startDate, setStartDate] = React.useState<Date | null>(new Date());
  const [endDate, setEndDate] = React.useState<Date | null>(null);
  const [filters, setFilters] = React.useState({
    name: searchName,
    action: actionData,
    start_date: startDate,
    end_date: endDate,
  });
  const navigate = useNavigate();

  React.useEffect(() => {
    clientApi.statistics.dataFilter(filters, jwt);
  }, [filters]);

  const handleInput = (field) => (event) => {
    const { value } = event.target;

    setFilters({
      ...filters,
      [field]: value,
    });

    switch (field) {
      case "name":
        setSearchName(value);
        break;
      case "action":
        setActionData(value);
        break;
      case "start_date":
        setStartDate(value);
        break;
      case "end_date":
        setEndDate(value);
        break;
      default:
        break;
    }
  };

  const routeStatisticsList = () => {
    navigate("/statistics");
  };

  const handleClearData = () => {
    setSearchName("");
    setActionData(null);
    setStartDate(new Date());
    setEndDate(null);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        columnGap: "10px",
        rowGap: "10px",
      }}
    >
      <Typography variant="h6">Filters</Typography>

      <TextField
        fullWidth
        id="search_name"
        name="search_name"
        label="Name"
        value={filters.name}
        onChange={handleInput("name")}
        sx={{ mb: 3 }}
      />

      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel id="demo-simple-select-label">Action</InputLabel>
        <Select
          name="action"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={filters.action}
          label="Action"
          onChange={handleInput("action")}
        >
          <MenuItem value="create">create</MenuItem>
          <MenuItem value="update">update</MenuItem>
          <MenuItem value="delete">delete</MenuItem>
        </Select>
      </FormControl>

      <LocalizationProvider dateAdapter={AdapterDateFns} sx={{ mb: 3 }}>
        <DatePicker
          disableFuture
          label="start_date"
          openTo="day"
          views={["year", "month", "day"]}
          value={filters.start_date}
          onChange={handleInput("start_date")}
          renderInput={(params) => <TextField {...params} />}
        />
        <DatePicker
          disableFuture
          label="end_date"
          openTo="day"
          views={["year", "month", "day"]}
          value={filters.end_date}
          onChange={handleInput("end_date")}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>

      <Stack direction="row" spacing={2}>
        <Button variant="outlined" color="error" onClick={handleClearData}>
          Cancel
        </Button>
      </Stack>
    </div>
  );
}

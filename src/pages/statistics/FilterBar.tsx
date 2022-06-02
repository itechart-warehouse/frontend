import * as React from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { clientApi } from "../../services/clientApi";
import { clearError } from "../../store/errorSlice";
import { useDispatch } from "react-redux";

export default function BasicDateRangePicker({ jwt, setUserLogs }) {
  const dispatch = useDispatch();
  const [searchName, setSearchName] = React.useState("");
  const [actionData, setActionData] = React.useState("");
  const [startDate, setStartDate] = React.useState<Date | null>(new Date());
  const [endDate, setEndDate] = React.useState<Date | null>(null);
  const [filters, setFilters] = React.useState({
    name: searchName,
    action: actionData,
  });

  React.useEffect(() => {
    if (searchName.length > 3 || actionData !== "" || endDate !== null)
      clientApi.statistics
        .dataFilter(filters, String(startDate), String(endDate), jwt)
        .then((res) => {
          setUserLogs(res.data.warehouse_audits);
          dispatch(clearError());
        });
  }, [filters, startDate, endDate]);

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
      default:
        break;
    }
  };

  const handlerCancelBtn = () => {
    clientApi.statistics.getAll(jwt).then((response) => {
      dispatch(clearError());
      setUserLogs(response.data.warehouse_audits);
    });
    filters.name = "";
    filters.action = "";
    setStartDate(new Date());
    setEndDate(null);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        columnGap: "10px",
        rowGap: "10px",
        marginBottom: "20px",
      }}
    >
      <Typography variant="h6">Filters</Typography>

      <TextField
        id="name"
        name="name"
        label="Name"
        value={filters.name}
        onChange={handleInput("name")}
      />

      <FormControl sx={{ width: "15%" }}>
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
        </Select>
      </FormControl>

      <LocalizationProvider
        dateAdapter={AdapterDateFns}
        sx={{ display: "flex", alignItems: "center", mb: 3 }}
      >
        <DatePicker
          disableFuture
          label="from"
          openTo="day"
          views={["year", "month", "day"]}
          value={startDate}
          onChange={(newDate) => setStartDate(newDate)}
          renderInput={(params) => <TextField {...params} />}
        />
        <DatePicker
          disableFuture
          label="to"
          openTo="day"
          views={["year", "month", "day"]}
          value={endDate}
          onChange={(newDate) => setEndDate(newDate)}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>

      <Button
        variant="outlined"
        color="error"
        sx={{ height: "56px" }}
        size="large"
        onClick={handlerCancelBtn}
      >
        Cancel
      </Button>
    </div>
  );
}

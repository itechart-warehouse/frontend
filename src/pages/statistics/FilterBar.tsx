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
import useDebounce from "./hook/useDebounce";

export default function BasicDateRangePicker({ jwt }) {
  const [searchName, setSearchName] = React.useState("");
  const [actionData, setActionData] = React.useState(null);
  const [startDate, setStartDate] = React.useState<Date | null>(new Date());
  const [endDate, setEndDate] = React.useState<Date | null>(null);
  const [filters, setFilters] = React.useState({
    name: searchName,
    action: actionData,
  });
  const debouncedValue = useDebounce<string>(searchName, 500);

  React.useEffect(() => {
    clientApi.statistics.dataFilter(filters, startDate, endDate, jwt).then();
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
        id="name"
        name="name"
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
          label="from"
          openTo="day"
          views={["year", "month", "day"]}
          value={startDate}
          onChange={(newDate) => setStartDate(newDate)}
          renderInput={(params) => (
            <TextField {...params} onChange={handleInput("from")} />
          )}
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

      <Stack direction="row" spacing={2}>
        <Button variant="outlined" color="error" onClick={handleClearData}>
          Cancel
        </Button>
      </Stack>
    </div>
  );
}

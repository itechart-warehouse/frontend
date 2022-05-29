import * as React from "react";
import ruLocale from "date-fns/locale/ru";
import {
  Button,
  Divider,
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

export default function BasicDateRangePicker() {
  const [searchName, setSearchName] = React.useState("");
  const [actionData, setActionData] = React.useState(null);
  const [startDate, setStartDate] = React.useState<Date | null>(new Date());
  const [endDate, setEndDate] = React.useState<Date | null>(null);

  const handlerDataFilters = () => {
    console.log(searchName, actionData, startDate, endDate);
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
        value={searchName}
        onChange={(event) => {
          setSearchName(event.target.value);
        }}
        sx={{ mb: 3 }}
      />

      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel id="demo-simple-select-label">Action</InputLabel>
        <Select
          name="filter_option"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={actionData}
          label="Action"
          onChange={(event) => setActionData(event.target.value as string)}
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

      <Stack direction="row" spacing={2}>
        <Button
          variant="outlined"
          color="error"
          name="filter_option"
          onClick={handleClearData}
        >
          Cancel
        </Button>
        <Button variant="outlined" color="success" onClick={handlerDataFilters}>
          Apply
        </Button>
      </Stack>
    </div>
  );
}

import * as React from "react";
import ruLocale from "date-fns/locale/ru";
import {
  Divider,
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
import * as dayjs from "dayjs";

export default function BasicDateRangePicker({
  onDateFilter,
  onNameFilter,
  onActionFilter,
  actions,
  // startDate,
  // setStartDate,
  // endDate,
  // setEndDate,
}) {
  const [filters, setFilters] = React.useState({
    name: "",
    action: "",
    from: "",
    to: "",
  });
  const [startDate, setStartDate] = React.useState<Date | null>(new Date());
  const [endDate, setEndDate] = React.useState<Date | null>(null);

  const handleInput = (field) => (event) => {
    const { value } = event.target;

    setFilters({
      ...filters,
      [field]: value,
    });

    switch (field) {
      case "name":
        onNameFilter(value);
        break;
      case "action":
        onActionFilter(value);
        break;
      case "from":
        onDateFilter(value, "from");
        break;
      case "to":
        break;
      default:
        break;
    }
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
          name="filter_option"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={filters.action}
          label="Action"
          onChange={handleInput("action")}
        >
          {actions.map((action) => (
            <MenuItem value={action} key={action.id}>
              {action}
            </MenuItem>
          ))}
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

      {/*<div>*/}
      {/*  <label htmlFor="startDate">From</label>*/}
      {/*  <input*/}
      {/*    type="date"*/}
      {/*    className="form-control"*/}
      {/*    id="startDate"*/}
      {/*    onChange={handleInput("from")}*/}
      {/*  />*/}
      {/*</div>*/}
      {/*<div>*/}
      {/*  <label htmlFor="endDate">To</label>*/}
      {/*  <input*/}
      {/*    type="date"*/}
      {/*    className="form-control"*/}
      {/*    id="endDate"*/}
      {/*    onChange={handleInput("to")}*/}
      {/*  />*/}
      {/*</div>*/}
    </div>
  );
}

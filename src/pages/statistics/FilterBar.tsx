import * as React from "react";
import ruLocale from "date-fns/locale/ru";
import { TextField, Typography } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function BasicDateRangePicker({ onDateFilter, onNameFilter }) {
  const [filters, setFilters] = React.useState({
    name: "",
    from: "",
    to: "",
  });

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
    <LocalizationProvider dateAdapter={AdapterDateFns}>
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
        <div className="col-sm-12 my-2">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={filters.name}
            onChange={handleInput("name")}
          />
        </div>

        <div>
          <label htmlFor="startDate">From</label>
          <input
            type="date"
            className="form-control"
            id="startDate"
            onChange={handleInput("from")}
          />
        </div>
        <div>
          <label htmlFor="endDate">To</label>
          <input
            type="date"
            className="form-control"
            id="endDate"
            onChange={handleInput("to")}
          />
        </div>
      </div>
    </LocalizationProvider>
  );
}

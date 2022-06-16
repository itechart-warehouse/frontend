import * as React from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateRangeType } from "./type/statistics.type";
import { useNavigate } from "react-router-dom";

const BasicDateRangePicker: React.FC<DateRangeType> = (
  props: DateRangeType
) => {
  const {
    filters,
    setFilters,
    setSearchName,
    setActionData,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
  } = props;

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

  const navigate = useNavigate();
  const routeStatisticsList = () => {
    navigate("/statistics");
  };

  const handlerCancelBtn = () => {
    filters.name = "";
    filters.action = "";
    setEndDate(new Date());
    setStartDate("");
    routeStatisticsList();
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
};

export default BasicDateRangePicker;

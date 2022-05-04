import * as React from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import CalendarPicker, { CalendarPickerProps } from "@mui/lab/CalendarPicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

/**
 * how you used the components
 */
export default function HomeCalendar() {
  const CustomCalendarPicker = styled(CalendarPicker)<CalendarPickerProps<any>>`
    margin: 0;
    width: 100%;
  `;

  const [date, setDate] = React.useState(new Date());
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box
        sx={(theme) => ({
          width: "100%",
          height: "100%",
          // background: "linear-gradient(45deg,#448acf 30%, #1976D2 90%)",
          background: "#F5F5F5",
          border: 0,
          borderRadius: 3,
        })}
      >
        <CustomCalendarPicker
          views={["day"]}
          date={date}
          onChange={(newValue) => setDate(newValue)}
          showDaysOutsideCurrentMonth
        />
      </Box>
    </LocalizationProvider>
  );
}

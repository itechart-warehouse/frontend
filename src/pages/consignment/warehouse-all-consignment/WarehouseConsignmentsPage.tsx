import * as React from "react";
import { Typography, Container, Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import RegistartedWarehouseConsignments from "../../../components/lists/RegistartedWarehouseConsignments";
import CheckedWarehouseConsignments from "../../../components/lists/CheckedWarehouseConsignments";
import PlacedWarehouseConsignments from "../../../components/lists/PlacedWarehouseConsignments";
import CheckedBeforeShipmentWarehouseConsignments from "../../../components/lists/CheckedBeforeShipmentWarehouseConsignments";
import ShippedWarehouseConsignments from "../../../components/lists/ShippedWarehouseConsignments";

const mainContainerStyle = { pt: 3 };
const titleStyle = { mb: 3 };

function WarehouseConsignmentsPage() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="xl" sx={mainContainerStyle}>
      <Typography variant="h2" sx={titleStyle}>
        Warehouse consignments listing
      </Typography>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Registered" value="1" />
            <Tab label="Checked" value="2" />
            <Tab label="Placed" value="3" />
            <Tab label="Checked before shipment" value="4" />
            <Tab label="Shipped" value="5" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <RegistartedWarehouseConsignments />
        </TabPanel>
        <TabPanel value="2">
          <CheckedWarehouseConsignments />
        </TabPanel>
        <TabPanel value="3">
          <PlacedWarehouseConsignments />
        </TabPanel>
        <TabPanel value="4">
          <CheckedBeforeShipmentWarehouseConsignments />
        </TabPanel>
        <TabPanel value="5">
          <ShippedWarehouseConsignments />
        </TabPanel>
      </TabContext>
    </Container>
  );
}

export default WarehouseConsignmentsPage;

import {
  Typography,
  Container,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Tab,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearError, setError } from "../../../store/errorSlice";
import { clientApi } from "../../../services/clientApi";
import { RootState } from "../../../store";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import ConsignmentCard from "../../../components/cards/ConsignmentCard";
import RegistartedWarehouseConsignments from "../../../components/lists/RegistartedWarehouseConsignments";
import CheckedWarehouseConsignments from "../../../components/lists/CheckedWarehouseConsignments";
import PlacedWarehouseConsignments from "../../../components/lists/PlacedWarehouseConsignments";
import CheckedBeforeShipmentWarehouseConsignment from "../../../components/lists/CheckedBeforeShipmentWarehouseConsignments";
import CheckedBeforeShipmentWarehouseConsignments from "../../../components/lists/CheckedBeforeShipmentWarehouseConsignments";
import ShippedWarehouseConsignments from "../../../components/lists/ShippedWarehouseConsignments";

interface Consignments {
  id: number;
  status: string;
  bundle_seria: string;
  bundle_number: string;
  consignment_seria: string;
  consignment_number: string;
  first_name: string;
  second_name: string;
  contractor_name: string;
  truck_number: string;
}

const mainContainerStyle = {
  pt: 3,
};

const titleStyle = {
  mb: 3,
};
const twinkleBlue = "#e9ecef";

const headStyle = {
  backgroundColor: twinkleBlue,
};

const rowStyle = {
  "&:last-child td, &:last-child th": { border: 0 },
};

function WarehouseConsignmentsPage() {
  const [consignments, setConsignments] = useState<Consignments[]>([]);
  const jwt = useSelector((state: RootState) => state.user.user.jwt);
  const dispatch = useDispatch();

  useEffect(() => {
    clientApi.consignment
      .getAll(jwt)
      .catch((err) => {
        if (err.response) {
          dispatch(setError([err.response.statusText]));
          console.log("response", err.response.statusText);
        } else if (err.request) {
          dispatch(setError(["Server is not working"]));
          console.log("request", err.request);
        } else {
          dispatch(setError([err.message]));
          console.log("message", err.message);
        }
        return Promise.reject(err);
      })
      .then((response) => {
        dispatch(clearError());
        setConsignments(response.data.consignments);
        console.log(response.data.consignments);
      });
  }, []);

  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <>
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
    </>
  );
}

export default WarehouseConsignmentsPage;

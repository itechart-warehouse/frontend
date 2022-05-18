import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Typography,
  Container,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Paper,
} from "@mui/material";
import { clientApi } from "../../../services/clientApi";
import { RootState } from "../../../store";
import { clearError } from "../../../store/errorSlice";
import { Section, Warehouse } from "./SectionsPage.types";
import * as React from "react";

const WarehouseState = { name: "" };
const mainContainerStyle = { pt: 3 };
const titleStyle = { mb: 3 };
const rowStyle = { "&:last-child td, &:last-child th": { border: 0 } };

function Sections() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const jwt = useSelector((state: RootState) => state.user.user.jwt);
  const [sections, setSections] = React.useState<Section[]>([]);
  const [warehouse, setWarehouse] = React.useState<Warehouse>(WarehouseState);
  React.useEffect(() => {
    clientApi.section.getAllByWarehouseId(id, jwt).then((response) => {
      dispatch(clearError());
      setSections(response.data.sections);
      setWarehouse(response.data.warehouse);
    });
  }, []);
  const navigate = useNavigate();
  const routeEditSections = () => navigate("edit");

  const twinkleBlue = "#e9ecef";
  const headStyle = { backgroundColor: twinkleBlue };

  return (
    <Container maxWidth="xl" sx={mainContainerStyle}>
      <Typography variant="h2" sx={titleStyle}>
        Sections listing of warehouse {warehouse.name}
      </Typography>
      <Button onClick={routeEditSections} variant="contained" sx={{ mb: 3 }}>
        Change sections
      </Button>
      <TableContainer sx={{ width: 400 }} component={Paper}>
        <Table aria-label="companiesPage table">
          <TableHead sx={headStyle}>
            <TableRow sx={rowStyle}>
              <TableCell>
                <Typography variant="h6">Section name</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6">Area</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sections.map((sec) => (
              <TableRow key={sec.id}>
                <TableCell component="th" scope="row">
                  {sec.name}
                </TableCell>
                <TableCell align="center">
                  {sec.reserved}
                  {"/"}
                  {sec.area}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default Sections;

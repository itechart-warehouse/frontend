import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import {
  Table,
  TableBody,
  TableRow,
  TableContainer,
  TableHead,
  Paper,
  Box,
  TableCell,
  tableCellClasses,
} from "@mui/material";
import { clientApi } from "../../services/clientApi";
import { clearError, setError } from "../../store/errorSlice";
import { RootState } from "../../store";

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
  reported: boolean;
}
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 18,
  },
  [`&.${tableCellClasses.body}`]: { fontSize: 18 },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": { backgroundColor: theme.palette.action.hover },
  "&:last-child td, &:last-child th": { border: 0 },
}));

function createData(name: string, count: number) {
  return { name, count };
}

export default function HomeData() {
  const [consignments, setConsignments] = React.useState<Consignments[]>([]);
  const jwt = useSelector((state: RootState) => state.user.user.jwt);
  const dispatch = useDispatch();

  React.useEffect(() => {
    clientApi.consignment
      .getAll(jwt)
      .catch((err) => {
        if (err.response) {
          dispatch(setError([err.response.statusText]));
        } else if (err.request) {
          dispatch(setError(["Server is not working"]));
        } else {
          dispatch(setError([err.message]));
        }
        return Promise.reject(err);
      })
      .then((response) => {
        dispatch(clearError());
        setConsignments(response.data.consignments);
      });
  }, []);

  const registeredCount = consignments.filter(
    (item) => item.status === "Registered"
  ).length;
  const checkedCount = consignments.filter(
    (item) => item.status === "Checked"
  ).length;
  const placedCount = consignments.filter(
    (item) => item.status === "Placed"
  ).length;
  const checkedBeforeSpipmentCount = consignments.filter(
    (item) => item.status === "Checked before shipment"
  ).length;
  const shippedCount = consignments.filter(
    (item) => item.status === "Shipped"
  ).length;

  const rows = [
    createData("Registered", registeredCount),
    createData("Checked", checkedCount),
    createData("Placed", placedCount),
    createData("Checked before shipment", checkedBeforeSpipmentCount),
    createData("Shipped", shippedCount),
  ];

  return (
    <Box
      sx={(theme) => ({
        width: "100%",
        height: "100%",
        background: "#F5F5F5",
        border: 0,
        borderRadius: 3,
      })}
    >
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Consignment status</StyledTableCell>
              <StyledTableCell align="center">Count</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="center">{row.count}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

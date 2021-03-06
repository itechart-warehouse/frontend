import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { clientApi } from "../../services/clientApi";
import { clearError, setError } from "../../store/errorSlice";
import { useDispatch, useSelector } from "react-redux";
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
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(name: string, count: number) {
  return { name, count };
}

export default function HomeData() {
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
      });
  }, []);

  console.log(consignments);
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
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 10 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Consignment status</StyledTableCell>
            <StyledTableCell align="left">Count</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="left">{row.count}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

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
  consignment: {
    registeredCount: number;
    checkedCount: number;
    placedCount: number;
    checkedBeforeSpipmentCount: number;
    shippedCount: number;
  };
}
const consignment = {
  consignment: {
    registeredCount: 0,
    checkedCount: 0,
    placedCount: 0,
    checkedBeforeSpipmentCount: 0,
    shippedCount: 0,
  },
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 18,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 18,
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
  const [consignments, setConsignments] =
    React.useState<Consignments>(consignment);
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
        setConsignments({
          consignment: {
            registeredCount: response.data.registered_conisgnment,
            checkedCount: response.data.checked_conisgnment,
            placedCount: response.data.placed_conisgnment,
            checkedBeforeSpipmentCount:
              response.data.checked_before_conisgnment,
            shippedCount: response.data.shipped_conisgnment,
          },
        });
      });
  }, []);

  const rows = [
    createData("Registered", consignments.consignment.registeredCount),
    createData("Checked", consignments.consignment.checkedCount),
    createData("Placed", consignments.consignment.placedCount),
    createData(
      "Checked before shipment",
      consignments.consignment.checkedBeforeSpipmentCount
    ),
    createData("Shipped", consignments.consignment.shippedCount),
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

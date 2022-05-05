import {
  Typography,
  Container,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  Paper,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearError, setError } from "../../../../../store/errorSlice";
import { clientApi } from "../../../../../services/clientApi";
import { RootState } from "../../../../../store";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { linkStyle } from "../../../../../styles/linkStyle";
import { Goods, Consignment, Warehouse } from "./ConsignmentGoods.types";
import useMount from "../../../../../services/isMountedHook";

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

function ConsignmentGoods() {
  const [goods, setGoods] = useState<Goods[]>([]);
  const [consignment, setConsignment] = useState<Consignment>({
    id: 0,
    bundle_seria: "",
    bundle_number: "",
  });
  const [warehouse, setWarehouse] = useState<Warehouse>({
    name: "",
  });
  const dispatch = useDispatch();
  const isMounted = useMount();

  const { id } = useParams();
  const jwt = useSelector((state: RootState) => state.user.user.jwt);

  useEffect(() => {
    clientApi.goods
      .getByConsignmentId(id, jwt)
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
        if (isMounted()) {
          dispatch(clearError());
          setGoods(response.data.goods);
          setConsignment(response.data.consignment);
          setWarehouse(response.data.warehouse);
          console.log(response.data.goods);
          console.log(response.data.consignment);
        }
      });
  }, []);

  return (
    <>
      <Container maxWidth="xl" sx={mainContainerStyle}>
        <Typography variant="h2" sx={titleStyle}>
          <Link
            to={`/warehouse-consignments/${consignment.id}`}
            style={linkStyle}
          >
            <ArrowBackIcon fontSize="large" />
          </Link>
          Goods listing of consignment{" "}
          <Link
            to={`/warehouse-consignments/${consignment.id}`}
            style={linkStyle}
          >
            {consignment.bundle_seria} {consignment.bundle_number}
          </Link>
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="usersPage table">
            <TableHead sx={headStyle}>
              <TableRow sx={rowStyle}>
                <TableCell>
                  <Typography variant="h6">Goods</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Name</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Status</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Quantity</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Placed</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Warehouse</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {goods.length ? (
                goods.map((good) => (
                  <TableRow key={good.id}>
                    <TableCell component="th" scope="row">
                      {good.bundle_seria} {good.bundle_number}
                    </TableCell>
                    <TableCell align="left" component="th" scope="row">
                      {good.name}
                    </TableCell>
                    <TableCell align="left" component="th" scope="row">
                      {good.status}
                    </TableCell>
                    <TableCell align="left" component="th" scope="row">
                      {good.quantity}
                    </TableCell>
                    <TableCell align="left" component="th" scope="row">
                      {good.placed_date ? good.placed_date : "NA"}
                    </TableCell>
                    <TableCell align="left" component="th" scope="row">
                      {good.warehouse_id ? warehouse.name : "NA"}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell>
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}

export default ConsignmentGoods;

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
} from "@mui/material";
import Paper from "@mui/material/Paper";
import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearError, setError } from "../../../../../store/errorSlice";
import { clientApi } from "../../../../../services/clientApi";
import { RootState } from "../../../../../store";

interface Goods {
  id: number;
  name: string;
  bundle_seria: string;
  bundle_number: string;
  quantity: string;
  placed_date: string;
}
interface Consignment {
  bundle_seria: string;
  bundle_number: string;
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

function ConsignmentGoods() {
  const [goods, setGoods] = useState<Goods[]>([]);
  const [consignment, setConsignment] = useState<Consignment>({
    bundle_seria: "",
    bundle_number: "",
  });
  const dispatch = useDispatch();
  const isMounted = useRef(false);

  const { id } = useParams();
  const jwt = useSelector((state: RootState) => state.user.user.jwt);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

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
        if (isMounted.current) {
          dispatch(clearError());
          setGoods(response.data.goods);
          setConsignment(response.data.consignment);
          console.log(response.data.goods);
          console.log(response.data.consignment);
        }
      });
  }, []);

  return (
    <>
      <Container maxWidth="xl" sx={mainContainerStyle}>
        <Typography variant="h2" sx={titleStyle}>
          Goods listing of consignment {consignment.bundle_seria}{" "}
          {consignment.bundle_number}
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
                  <Typography variant="h6">Quantity</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Placed</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {goods.length ? (
                goods.map((good) => (
                  <TableRow key={good.id}>
                    <TableCell component="th" scope="row">
                      <Link to={`${good.id}`}>
                        {good.bundle_seria} {good.bundle_number}
                      </Link>
                    </TableCell>
                    <TableCell align="left" component="th" scope="row">
                      {good.name}
                    </TableCell>
                    <TableCell align="left" component="th" scope="row">
                      {good.quantity}
                    </TableCell>
                    <TableCell align="left" component="th" scope="row">
                      {good.placed_date ? good.placed_date : "NA"}
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

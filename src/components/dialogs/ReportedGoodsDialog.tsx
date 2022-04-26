import * as React from "react";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import { RootState } from "../../store";
import { useEffect, useState } from "react";
import { clientApi } from "../../services/clientApi";
import { clearError, setError } from "../../store/errorSlice";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import Divider from "@mui/material/Divider";

interface Goods {
  id: number;
  name: string;
  reported_quantity: string;
  status: string;
}

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

export default function ReportedGoodsDialog(props: SimpleDialogProps) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose("");
  };
  const jwt = useSelector((state: RootState) => state.user.user.jwt);
  const id = selectedValue;
  const dispatch = useDispatch();
  const [goods, setGoods] = useState<Goods[]>([]);
  useEffect(() => {
    clientApi.report
      .reportedGoods(id, jwt)
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
        setGoods(response.data.reported_goods);
      });
  }, [id]);

  const twinkleBlue = "#e9ecef";
  const headStyle = {
    backgroundColor: twinkleBlue,
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Report's goods</DialogTitle>
      <Divider />
      <Table sx={{ minWidth: 300 }} aria-label="companiesPage table">
        <TableHead sx={headStyle}>
          <TableRow>
            <TableCell>
              <Typography fontWeight={"bold"}>Name</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography fontWeight={"bold"}>Quantity</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography fontWeight={"bold"}>Status</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {goods.map((good) => (
            <TableRow key={good.id}>
              <TableCell component="th" scope="row">
                {good.name}
              </TableCell>
              <TableCell align="center">{good.reported_quantity}</TableCell>
              <TableCell align="right">{good.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Dialog>
  );
}

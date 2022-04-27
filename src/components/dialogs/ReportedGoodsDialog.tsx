import { RootState } from "../../store";
import { useEffect, useState } from "react";
import { clientApi } from "../../services/clientApi";
import { clearError, setError } from "../../store/errorSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Divider,
  Typography,
  Button,
  DialogTitle,
  Dialog,
} from "@mui/material";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import { Goods, ReportProps } from "./ReportedGoodsDialog.types";

export default function ReportedGoodsDialog({ reportId }: ReportProps) {
  const [open, setOpen] = useState(false);
  const jwt = useSelector((state: RootState) => state.user.user.jwt);
  const dispatch = useDispatch();
  const [goods, setGoods] = useState<Goods[]>([]);
  useEffect(() => {
    clientApi.report
      .reportedGoods(reportId, jwt)
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
  }, [reportId]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const twinkleBlue = "#e9ecef";
  const headStyle = {
    backgroundColor: twinkleBlue,
  };

  return (
    <>
      <Button onClick={() => handleClickOpen()}>
        <ViewInArIcon />
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
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
    </>
  );
}

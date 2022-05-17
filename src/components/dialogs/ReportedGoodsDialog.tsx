import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { clientApi } from "../../services/clientApi";
import { clearError } from "../../store/errorSlice";
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
  const [open, setOpen] = React.useState(false);
  const jwt = useSelector((state: RootState) => state.user.user.jwt);
  const dispatch = useDispatch();
  const [goods, setGoods] = React.useState<Goods[]>([]);
  React.useEffect(() => {
    clientApi.report.reportedGoods(reportId, jwt).then((response) => {
      dispatch(clearError());
      setGoods(response.data.reported_goods);
    });
  }, [reportId]);

  const handleClickOpen = () => setOpen(true);

  const twinkleBlue = "#e9ecef";
  const headStyle = { backgroundColor: twinkleBlue };

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

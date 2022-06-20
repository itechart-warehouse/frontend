import { styled } from "@mui/material/styles";
import { alpha, TextField } from "@mui/material";
import { Field } from "formik";

export const SearchPanel = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  marginBottom: "16px",
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

export interface SearchProps {
  handleSubmit: (search: string) => void;
}

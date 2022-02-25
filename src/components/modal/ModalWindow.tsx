import { Box, Collapse, IconButton, Alert } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { clearError } from "../../store/errorSlice";
import { useNavigate } from "react-router-dom";

interface ModalWindowProps {
    isOpen: boolean,
}

function ModalWindow({ isOpen } : ModalWindowProps) {
  const error = useSelector((state: RootStateOrAny) => state.error);
  const [open, setOpen] = useState(isOpen);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const routeHome = () => {
    navigate("/home");
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Collapse in={open}>
        <Alert
          severity="warning"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
                dispatch(clearError());
                routeHome();
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {/* TODO add success message*/}
            {error[0]}
        </Alert>
      </Collapse>
    </Box>
  );
}

export default ModalWindow;

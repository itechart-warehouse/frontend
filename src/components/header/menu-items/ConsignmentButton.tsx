import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Menu, MenuItem, Button } from "@mui/material";

export default function ConsignmentButton() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const navigate = useNavigate();
  const truckConsignmentsRoute = () => navigate("/consignments");
  const warehouseConsignmentsRoute = () => navigate("/warehouse-consignments");

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        color="inherit"
      >
        Consignments
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            truckConsignmentsRoute();
          }}
        >
          Incoming listing
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            warehouseConsignmentsRoute();
          }}
        >
          Warehouse listing
        </MenuItem>
      </Menu>
    </div>
  );
}

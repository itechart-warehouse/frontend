import * as React from "react";
import { Menu, MenuItem } from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

export default function WarehouseButton() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const company = useSelector((state: RootState) => state.user.userCompany);

  const navigate = useNavigate();
  const warehouseCreate = () => {
    navigate("/warehouse/create");
  };
  const warehouseList = () => {
    navigate(`/companies/${company.id}/warehouses`);
  };
  return (
    <>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        color="inherit"
      >
        Warehouses
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
            warehouseList();
          }}
        >
          Listing
        </MenuItem>
        {/*<MenuItem*/}
        {/*  onClick={() => {*/}
        {/*    handleClose();*/}
        {/*    warehouseCreate();*/}
        {/*  }}*/}
        {/*>*/}
        {/*  Create warehouse*/}
        {/*</MenuItem>*/}
      </Menu>
    </>
  );
}

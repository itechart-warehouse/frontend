import * as React from "react";
import { Menu, MenuItem } from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

export default function CompanyButton() {
  const role = useSelector((state: RootState) => state.user.userRole.name);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();
  const companiesRoute = () => {
    navigate("/companies");
  };
  const createCompanyRoute = () => {
    navigate("/company/create");
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
        Companies
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
            companiesRoute();
          }}
        >
          Listing
        </MenuItem>
        {role === "System admin" ? (
          <MenuItem
            onClick={() => {
              createCompanyRoute();
              handleClose();
            }}
          >
            Create company
          </MenuItem>
        ) : (
          ""
        )}
      </Menu>
    </>
  );
}

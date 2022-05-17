import * as React from "react";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Divider from "@mui/material/Divider";

export default function WelcomeTitle() {
  const user = useSelector((state: RootState) => state.user.user);
  const company = useSelector((state: RootState) => state.user.userCompany);
  const warehouse = useSelector((state: RootState) => state.user.userWarehouse);
  const role = useSelector((state: RootState) => state.user.userRole.name);

  const checkWarehouse = () => {
    if (warehouse.name) {
      return (
        <Typography variant="h4">
          Your warehouse is{" "}
          <Box component="span" fontWeight="600">
            {warehouse.name}
          </Box>
        </Typography>
      );
    }
  };

  return (
    <div>
      <Box>
        <Divider sx={{ color: "#1976d2" }}>
          <Typography variant="h1" gutterBottom>
            Hello, {user.firstName}!
          </Typography>
        </Divider>
        <Typography variant="h4" gutterBottom>
          You are {role} in the{" "}
          <Box component="span" fontWeight="600">
            {company.name}
          </Box>
        </Typography>
        {checkWarehouse()}
      </Box>
    </div>
  );
}

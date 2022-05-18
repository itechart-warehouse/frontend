import * as React from "react";
import { Box, Card, Grid, Typography } from "@mui/material";
import UserCard from "../../../components/cards/UserCard";
import UserCardImage from "../../../image/UserCard.svg";

const backgroundStyle = {
  height: "90vh",
  backgroundImage: `url(${UserCardImage})`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right bottom",
  backgroundSize: "25%",
  marginRight: "20px",
};

function UserShowPage() {
  return (
    <Grid sx={backgroundStyle}>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item>
          <Typography
            variant="h3"
            component="div"
            gutterBottom
            color="primary"
            align="center"
          >
            User info
          </Typography>
          <Box sx={{ minWidth: 500 }}>
            <Card variant="outlined">
              <UserCard />
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default UserShowPage;

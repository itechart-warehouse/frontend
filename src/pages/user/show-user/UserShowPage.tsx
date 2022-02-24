import UserCard from "../../../components/cards/UserCard";
import { Box, Card, Grid, Typography } from "@mui/material";
import { RootStateOrAny, useSelector } from "react-redux";
import { RootState } from "../../../store";

function UserShowPage() {
  return (
    <>
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
    </>
  );
}

export default UserShowPage;

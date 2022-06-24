import RoleCard from "../../../components/cards/RoleCard";
import { Box, Card, Grid, Typography } from "@mui/material";
// @ts-ignore

const backgroundStyle = {
  height: "90vh",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right bottom",
  backgroundSize: "25%",
  marginRight: "20px",
};

function RoleShowPage() {
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
            Role info
          </Typography>
          <Box sx={{ minWidth: 500 }}>
            <Card variant="outlined">
              <RoleCard />
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default RoleShowPage;

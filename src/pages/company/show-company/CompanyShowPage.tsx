import { Box, Card, Grid, Typography } from "@mui/material";
import CompanyCard from "../../../components/cards/CompanyCard";

function CompanyShowPage() {
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
            Company name
          </Typography>
          <Box sx={{ minWidth: 500 }}>
            <Card variant="outlined">
              <CompanyCard />
            </Card>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default CompanyShowPage;

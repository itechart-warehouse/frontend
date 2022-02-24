import { Box, Card, Grid, Typography } from "@mui/material";
import CompanyCard from "../../../components/cards/CompanyCard";
import {useDispatch} from "react-redux";
import {clearError} from "../../../store/errorSlice";

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
            Company info
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

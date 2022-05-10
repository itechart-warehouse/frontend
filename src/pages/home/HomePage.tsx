import { Container, Grid, Box } from "@mui/material";
import WelcomeTitle from "../../components/main-page/WelcomeTitle";
import HomeCalendar from "../../components/main-page/HomeCalendar";
import HomeData from "../../components/main-page/HomeData";
// @ts-ignore
import HomeImage from "../../image/HomeImage.svg";

export default function BasicGrid() {
  return (
    <Container maxWidth="xl">
      <Grid
        container
        spacing={10}
        alignItems="center"
        justifyContent="center"
        paddingTop={"100px"}
      >
        <Grid item xs={8} style={{ minWidth: "50vw" }} textAlign={"center"}>
          <WelcomeTitle />
        </Grid>
        <Grid item xs={4} textAlign={"left"}>
          <Box
            component="img"
            sx={{
              height: "100%",
              width: "100%",
            }}
            alt="Home image"
            src={HomeImage}
          />
        </Grid>
        <Grid item xs={4} textAlign={"center"}>
          <HomeData />
        </Grid>
        <Grid item xs={4} alignItems={"center"}>
          <HomeCalendar />
        </Grid>
      </Grid>
    </Container>
  );
}

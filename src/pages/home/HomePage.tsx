import * as React from "react";
import Box from "@mui/material/Box";
import { Container, Grid } from "@mui/material";
import WelcomeTitle from "../../components/main-page/WelcomeTitle";
import HomeCalendar from "../../components/main-page/HomeCalendar";
import HomeData from "../../components/main-page/HomeData";

export default function BasicGrid() {
  return (
    <Container maxWidth="xl">
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={10}
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: "100vh" }}
          paddingTop={"100px"}
        >
          <Grid item xs={8} style={{ minWidth: "50vw" }} textAlign={"center"}>
            <WelcomeTitle />
          </Grid>
          <Grid item xs={4} textAlign={"left"}>
            <Box
              component="img"
              sx={{
                height: 500,
                width: 500,
                maxHeight: { xs: 500, md: 500 },
                maxWidth: { xs: 500, md: 500 },
              }}
              alt="Image"
              src="https://assets.website-files.com/5f8ad5900964f1286fb46d05/6058f250c077d21886e5400a_pic-2.svg"
            />
          </Grid>
          <Grid item xs={2} textAlign={"right"}></Grid>
          <Grid item xs={4} textAlign={"right"}>
            <HomeData />
          </Grid>
          <Grid item xs={5} alignItems={"center"}>
            <HomeCalendar />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

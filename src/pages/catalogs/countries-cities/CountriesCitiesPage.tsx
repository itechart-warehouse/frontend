import { Container, Grid } from "@mui/material";
import CountryCatalog from "../../../components/lists/CountryCatalog";
import CityCatalog from "../../../components/lists/CityCatalog";
import React from "react";

export default function CountriesCitiesCatalog() {
  return (
    <Container maxWidth="xl">
      <Grid
        container
        spacing={10}
        alignItems="center"
        justifyContent="center"
        paddingTop={"100px"}
      >
        <Grid item xs={6} textAlign={"center"}>
          <CountryCatalog />
        </Grid>
        <Grid item xs={6} alignItems={"center"}>
          <CityCatalog />
        </Grid>
      </Grid>
    </Container>
  );
}

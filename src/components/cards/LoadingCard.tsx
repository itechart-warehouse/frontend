import * as React from "react";
import { Skeleton, Card, Typography, CardContent } from "@mui/material";

const cardStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  minWidth: 500,
  minHeight: 500,
};

export default function LoadingCard() {
  return (
    <Card>
      <CardContent sx={cardStyle}>
        <Typography variant="h4" component="div">
          <Skeleton variant="text" width={200} />
        </Typography>
        <Typography variant="h6" component="div">
          <Skeleton variant="text" width={300} />
        </Typography>
        <Typography variant="h6" component="div">
          <Skeleton variant="text" width={250} />
        </Typography>
        <Typography variant="h6" component="div">
          <Skeleton variant="text" width={300} />
        </Typography>
        <Typography variant="h6" component="div">
          <Skeleton variant="text" width={200} />
        </Typography>
        <Typography variant="h6" component="div">
          <Skeleton variant="text" width={400} />
        </Typography>
      </CardContent>
    </Card>
  );
}

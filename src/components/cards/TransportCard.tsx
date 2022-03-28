import * as React from "react";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearError, setError } from "../../store/errorSlice";

interface Transport {
  truck_number: string;
}

export default function TransportCard() {
  const [transport, setTransport] = useState<Transport>({
    truck_number: "",
  });

  const { id } = useParams();

  useEffect(() => {
    fetch("/transport/:trId")
      .catch((err) => {
        if (err.response) {
          dispatch(setError([err.response.statusText]));
          console.log("response", err.response.statusText);
        } else if (err.request) {
          dispatch(setError(["Server is not working"]));
          console.log("request", err.request);
        } else {
          dispatch(setError([err.message]));
          console.log("message", err.message);
        }
        return Promise.reject(err);
      })
      .then((res) => {
        dispatch(clearError());
        return res.json();
      })
      .then((data) => {
        setTransport(data.transport);
      });
  }, [id]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const routeTransportList = () => {
    navigate("/transports");
  };

  return (
    <React.Fragment>
      <CardContent>
        <Typography variant="h6" component="div">
          Car number
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {transport.truck_number}
        </Typography>
        <Typography variant="h6" component="div">
          Contractor
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          N/A
          {/*    {transport.contractor} */}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={routeTransportList}>Transport list</Button>
      </CardActions>
    </React.Fragment>
  );
}

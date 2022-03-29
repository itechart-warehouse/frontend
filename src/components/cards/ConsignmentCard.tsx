import * as React from "react";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { truckApi } from "../../services/truckApi";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setConsignmentState } from "../../store/consignmentSlice";
import { RootState } from "../../store";
import {clearError, setError} from "../../store/errorSlice";

interface Consignment {
  id: number;
  status: string;
  bundle_seria: string;
  bundle_number: string;
  consignment_seria: string;
  consignment_number: string;
  truck:{
    truck_number: string;
    truck_type: {
      truck_type_name: string;
    }
  }
  driver  : {
    first_name: string;
    second_name: string;
    middle_name: string;
    birthday: string;
    passport: string;
    role:{
      role_name: string;
    }
    company:{
      name: string;
    }
  }
}

export default function ConsignmentCard() {
  const jwt = useSelector((state: RootState) => state.user.user.jwt);
  const [consignment, setConsignment] = useState<Consignment>({
    id: 0,
    status: "",
    bundle_seria: "",
    bundle_number: "",
    consignment_seria: "",
    consignment_number: "",
    truck:{
      truck_number: "",
      truck_type: {
        truck_type_name: "",
      },
    },
    driver  : {
      first_name: "",
      second_name: "",
      middle_name: "",
      birthday: "",
      passport: "",
      role:{
        role_name: "",
      },
      company:{
        name: "",
      },
    }
  });
  const { id } = useParams();

  useEffect(() => {
    truckApi.consignment
      .getById(id, jwt)
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
        setConsignment(res.data.consignment);
      });
  }, [id]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const routeConsignmentList = () => {
    navigate("/consignments");
  };

  return (
    <React.Fragment>
      <CardContent>
        <Typography variant="h4" component="div">

        </Typography>
        <br />
        <Typography variant="h6" component="div">

        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">

        </Typography>
        <Typography variant="h6" component="div">

        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">

        </Typography>
        <Typography variant="h6" component="div">

        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">

        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={routeConsignmentList}>Cancel</Button>
      </CardActions>
    </React.Fragment>
  );
}

import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { clearError, setError } from "../../store/errorSlice";
import { clientApi } from "../../services/clientApi";
import { Alert } from "@mui/material";
import LoadingCard from "./LoadingCard";
import { Consignment, UserInfo } from "./types/WarehouseConsignmnet.types";

const consignmentInit = {
  id: 0,
  status: "",
  bundle_seria: "",
  bundle_number: "",
  consignment_seria: "",
  consignment_number: "",
  first_name: "",
  second_name: "",
  passport: "",
  contractor_name: "",
  truck_number: "",
  date: "",
};

const userInfoInit = {
  user: {
    first_name: "",
    last_name: "",
  },
};

export default function WarehouseConsignmentCard() {
  const [isLoaded, setIsLoaded] = useState(false);
  const jwt = useSelector((state: RootState) => state.user.user.jwt);
  const role = useSelector((state: RootState) => state.user.userRole.name);
  const [userActions, setUserActions] = useState<UserInfo>(userInfoInit);
  const [consignment, setConsignment] = useState<Consignment>(consignmentInit);

  console.log(" ROLE", role);

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    clientApi.consignment
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
        if (isMounted.current) {
          setConsignment(res.data.consignment);
          setUserActions(res.data.actions);
          console.log("consignment", res.data.consignment);
          console.log("user_actions", res.data.actions);
          dispatch(clearError());
          setIsLoaded(true);
        }
      });
  }, [id]);

  const check = () => {
    clientApi.warehouseConsignment
      .check(id, jwt)
      .catch((err) => {
        if (err.response) {
          dispatch(setError([err.response.data.error]));
          console.log("response", err.response.data.error);
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
        routeConsignmentList();
      });
  };

  const place = () => {
    clientApi.warehouseConsignment
      .place(id, jwt)
      .catch((err) => {
        if (err.response) {
          dispatch(setError([err.response.data.error]));
          console.log("response", err.response.data.error);
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
        routeConsignmentList();
      });
  };

  const recheck = () => {
    clientApi.warehouseConsignment
      .recheck(id, jwt)
      .catch((err) => {
        if (err.response) {
          dispatch(setError([err.response.data.error]));
          console.log("response", err.response.data.error);
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
        routeConsignmentList();
      });
  };

  const shipp = () => {
    clientApi.warehouseConsignment
      .shipp(id, jwt)
      .catch((err) => {
        if (err.response) {
          dispatch(setError([err.response.data.error]));
          console.log("response", err.response.data.error);
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
        routeConsignmentList();
      });
  };

  const statusAlert = () => {
    if (consignment.status === "Registered") {
      return (
        <Alert severity="success">
          This consignment was registered in the warehouse.
        </Alert>
      );
    } else if (consignment.status === "Checked") {
      return <Alert severity="success">This consignment was checked.</Alert>;
    } else if (consignment.status === "Placed") {
      return (
        <Alert severity="success">
          This consignment was placed in the warehouse.
        </Alert>
      );
    } else if (consignment.status === "Checked before shipment") {
      return (
        <Alert severity="success">
          This consignment was checked before shipment.
        </Alert>
      );
    } else {
      return <Alert severity="success">This consignment was shipped.</Alert>;
    }
  };

  const statusAction = () => {
    if (consignment.status === "Registered" && role === "Inspector") {
      return (
        <Button color="success" onClick={check}>
          Check
        </Button>
      );
    } else if (
      consignment.status === "Checked" &&
      role === "Warehouse Manager"
    ) {
      return <Button onClick={place}>Place</Button>;
    } else if (consignment.status === "Placed" && role === "Inspector") {
      return <Button onClick={recheck}>Recheck</Button>;
    } else if (
      consignment.status === "Checked before shipment" &&
      role === "Dispatcher"
    ) {
      return <Button onClick={shipp}>Shipp</Button>;
    } else if (consignment.status === "Shipped") {
      <Alert severity="success">This consignment was shipped.</Alert>;
    }
  };

  const routeConsignmentList = () => {
    navigate("/warehouse-consignments");
  };

  const routeReportCreate = () => {
    navigate("reports/create");
  };

  return (
    <>
      {isLoaded ? (
        <Card>
          {statusAlert()}
          <CardContent>
            <Typography variant="h4" component="div"></Typography>
            <br />
            <Typography variant="h6" component="div">
              Series and number
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {consignment.consignment_seria}
              {consignment.consignment_number}
            </Typography>
            <Typography variant="h6" component="div">
              Status
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {consignment.status} by {userActions.user.first_name}{" "}
              {userActions.user.last_name} at {consignment.date}
            </Typography>
            <Typography variant="h6" component="div">
              Contractor
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {consignment.contractor_name}
            </Typography>
            <Typography variant="h6" component="div">
              Bundle
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {consignment.bundle_seria}
              {consignment.bundle_number}
            </Typography>
            <Typography variant="h6" component="div">
              Driver
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {consignment.first_name} {consignment.second_name}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {consignment.passport}
            </Typography>
            <Typography variant="h6" component="div">
              Truck
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {consignment.truck_number}
            </Typography>
            <Typography variant="h6" component="div"></Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary"></Typography>
          </CardContent>
          <CardActions>
            <Button onClick={routeConsignmentList}>
              Warehouse consignments list
            </Button>
            {statusAction()}
            <Button href={`${consignment.id}/goods`}>Goods</Button>
            <Button color="error" onClick={routeReportCreate}>
              Report
            </Button>
          </CardActions>
        </Card>
      ) : (
        <LoadingCard />
      )}
    </>
  );
}

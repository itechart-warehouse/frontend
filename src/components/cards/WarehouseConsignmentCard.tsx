import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Alert,
} from "@mui/material";
import { RootState } from "../../store";
import { clearError } from "../../store/errorSlice";
import { clientApi } from "../../services/clientApi";
import LoadingCard from "./LoadingCard";
import { Consignment, UserInfo } from "./types/WarehouseConsignmnet.types";
import useMount from "../../services/isMountedHook";

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
  const [isLoaded, setIsLoaded] = React.useState(false);
  const jwt = useSelector((state: RootState) => state.user.user.jwt);
  const role = useSelector((state: RootState) => state.user.userRole.name);
  const [userActions, setUserActions] = React.useState<UserInfo>(userInfoInit);
  const [consignment, setConsignment] =
    React.useState<Consignment>(consignmentInit);

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isMounted = useMount();

  React.useEffect(() => {
    clientApi.consignment.getById(id, jwt).then((res) => {
      if (isMounted()) {
        setConsignment(res.data.consignment);
        setUserActions(res.data.actions);
        dispatch(clearError());
        setIsLoaded(true);
      }
    });
  }, [id]);

  const check = () => {
    clientApi.warehouseConsignment.check(id, jwt).then(() => {
      dispatch(clearError());
      routeConsignmentList();
    });
  };

  const place = () => {
    clientApi.warehouseConsignment.place(id, jwt).then(() => {
      dispatch(clearError());
      routeConsignmentList();
    });
  };

  const recheck = () => {
    clientApi.warehouseConsignment.recheck(id, jwt).then(() => {
      dispatch(clearError());
      routeConsignmentList();
    });
  };

  const shipp = () => {
    clientApi.warehouseConsignment.shipp(id, jwt).then(() => {
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
      return <Alert severity="success">This consignment was shipped.</Alert>;
    }
  };

  const routeConsignmentList = () => navigate("/warehouse-consignments");
  const routeReportCreate = () => navigate("reports/create");

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

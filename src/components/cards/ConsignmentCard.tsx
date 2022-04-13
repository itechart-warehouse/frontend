import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { truckApi } from "../../services/truckApi";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { clearError, setError } from "../../store/errorSlice";
import { clientApi } from "../../services/clientApi";
import LoadingCard from "./LoadingCard";

interface Consignment {
  id: number;
  status: string;
  bundle_seria: string;
  bundle_number: string;
  consignment_seria: string;
  consignment_number: string;

  truck: {
    truck_number: string;
    truck_type: {
      truck_type_name: string;
    };
  };
  driver: {
    first_name: string;
    second_name: string;
    middle_name: string;
    birthday: string;
    passport: string;

    role: {
      role_name: string;
    };
    company: {
      name: string;
    };
  };
}

interface Goods {
  good_status: string;
  good_name: string;
  quantity: number;
}

export default function ConsignmentCard() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [consignment, setConsignment] = useState<Consignment>({
    id: 0,
    status: "",
    bundle_seria: "",
    bundle_number: "",
    consignment_seria: "",
    consignment_number: "",
    truck: {
      truck_number: "",
      truck_type: {
        truck_type_name: "",
      },
    },
    driver: {
      first_name: "",
      second_name: "",
      middle_name: "",
      birthday: "",
      passport: "",
      role: {
        role_name: "",
      },
      company: {
        name: "",
      },
    },
  });

  const [goods, setGoods] = useState<Goods>({
    good_status: "",
    good_name: "",
    quantity: 0,
  });

  const { id } = useParams();
  const jwt = useSelector((state: RootState) => state.user.user.jwt);
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
    truckApi.consignment
      .getById(id)
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
          setConsignment(res.data);
          console.log("consignment", res.data);
          dispatch(clearError());
          setIsLoaded(true);
        }
      });
  }, [id]);

  useEffect(() => {
    truckApi.goods
      .getByConsignmentId(id)
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
        setGoods(res.data);
        dispatch(clearError());
      });
  }, [id]);

  const routeConsignmentList = () => {
    navigate("/consignments");
  };

  const routeRegisteredConsignment = (warehouse_consignment_id: number) => {
    navigate(`/warehouse-consignments/${warehouse_consignment_id}`);
  };

  const registration = () => {
    clientApi.consignment
      .create(consignment, goods, jwt)
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
        routeRegisteredConsignment(res.data.consignment.id);
      });
  };

  return (
    <>
      {isLoaded ? (
        <Card>
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
              {consignment.status}
            </Typography>
            <Typography variant="h6" component="div">
              Contractor
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {consignment.driver.company.name}
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
              {consignment.driver.first_name} {consignment.driver.second_name}{" "}
              {consignment.driver.middle_name}
            </Typography>
            <Typography variant="h6" component="div">
              Truck
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {consignment.truck.truck_number}
            </Typography>
            <Typography variant="h6" component="div"></Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary"></Typography>
          </CardContent>
          <CardActions>
            <Button onClick={routeConsignmentList}>Cancel</Button>
            <Button onClick={registration} color="success">
              Registration
            </Button>
          </CardActions>
        </Card>
      ) : (
        <LoadingCard />
      )}
    </>
  );
}

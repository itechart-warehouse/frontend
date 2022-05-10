import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useEffect, useState } from "react";
import { truckApi } from "../../services/truckApi";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { clearError } from "../../store/errorSlice";
import { clientApi } from "../../services/clientApi";
import LoadingCard from "./LoadingCard";
import { Consignment, Goods } from "./types/Consignment.types";
import useMount from "../../services/isMountedHook";

const consignmentInit = {
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
};

const goodsInit = {
  good_status: "",
  good_name: "",
  quantity: 0,
};

export default function ConsignmentCard() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [consignment, setConsignment] = useState<Consignment>(consignmentInit);
  const [goods, setGoods] = useState<Goods>(goodsInit);
  const { id } = useParams();
  const jwt = useSelector((state: RootState) => state.user.user.jwt);
  const role = useSelector((state: RootState) => state.user.userRole.name);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isMounted = useMount();

  useEffect(() => {
    truckApi.consignment
      .getById(id)
      .then((res) => {
        if (isMounted()) {
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
          <CardActions sx={{ justifyContent: "space-between" }}>
            <Button onClick={routeConsignmentList}>
              <ArrowBackIcon fontSize="large" />
            </Button>
            {role === "Dispatcher" ? (
              <Button onClick={registration} color="success">
                Registration
              </Button>
            ) : (
              ""
            )}
          </CardActions>
        </Card>
      ) : (
        <LoadingCard />
      )}
    </>
  );
}

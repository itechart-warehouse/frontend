import {
  Button,
  CardContent,
  Typography,
  Card,
  CardActions,
} from "@mui/material";
import { clientApi } from "../../services/clientApi";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { clearError, setError } from "../../store/errorSlice";
import { setWarehouseState } from "../../store/warehouseSlice";
import LoadingCard from "./LoadingCard";

interface Warehouse {
  warehouse: {
    name: string;
    address: string;
    phone: string;
    area: string;
    reserved: string;
  };
  company: {
    id: any;
    name: string;
  };
  user: {
    first_name: string;
    last_name: string;
    id: string;
  };
}

function WarehouseCard() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [warehouse, setWarehouse] = useState<Warehouse>({
    warehouse: {
      name: "",
      address: "",
      phone: "",
      area: "",
      reserved: "",
    },
    company: {
      id: "",
      name: "",
    },
    user: {
      first_name: "",
      last_name: "",
      id: "",
    },
  });
  const jwt = useSelector((state: RootState) => state.user.user.jwt);
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
    clientApi.warehouse
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
          dispatch(clearError());
          setWarehouse(res.data);
          setIsLoaded(true);
        }
      });
  }, [id]);

  const routeWarehouseList = () => {
    console.log(warehouse.company.id);
    navigate(`/companies/${warehouse.company.id}/warehouses`);
  };
  const routeWarehouseEdit = () => {
    navigate(`/warehouse/${id}/edit`);
    dispatch(setWarehouseState(warehouse.warehouse));
  };

  return (
    <>
      {isLoaded ? (
        <Card>
          <CardContent>
            <Typography variant="h4" component="div">
              {warehouse.warehouse.name}
            </Typography>
            <br />
            <Typography variant="h6" component="div">
              Address
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {warehouse.warehouse.address}
            </Typography>
            <Typography variant="h6" component="div">
              Phone
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {warehouse.warehouse.phone}
            </Typography>
            <Typography variant="h6" component="div">
              Area
            </Typography>
            <Typography color="text.secondary">
              {warehouse.warehouse.reserved}/{warehouse.warehouse.area}
            </Typography>
            <Typography variant="h6" component="div">
              Company name
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {warehouse.company.name}
            </Typography>
            <Typography variant="h6" component="div">
              Admin
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              <Link to={`/users/${warehouse.user.id}`}>
                {warehouse.user.first_name} {warehouse.user.last_name}
              </Link>
            </Typography>

            <CardActions>
              <Button onClick={routeWarehouseEdit}>Edit</Button>
              <Button onClick={routeWarehouseList}>Cancel</Button>
            </CardActions>
          </CardContent>
        </Card>
      ) : (
        <LoadingCard />
      )}
    </>
  );
}

export default WarehouseCard;

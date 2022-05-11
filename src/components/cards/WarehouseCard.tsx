import {
  Button,
  CardContent,
  Typography,
  Card,
  CardActions,
} from "@mui/material";
import { clientApi } from "../../services/clientApi";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { clearError, setError } from "../../store/errorSlice";
import { setWarehouseState } from "../../store/warehouseSlice";
import LoadingCard from "./LoadingCard";
import { Warehouse } from "./types/Warehouse.types";
import useMount from "../../services/isMountedHook";

const warehouseInit = {
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
};

function WarehouseCard() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [warehouse, setWarehouse] = useState<Warehouse>(warehouseInit);
  const jwt = useSelector((state: RootState) => state.user.user.jwt);
  const role = useSelector((state: RootState) => state.user.userRole.name);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isMounted = useMount();

  useEffect(() => {
    clientApi.warehouse.getById(id, jwt).then((res) => {
      if (isMounted()) {
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
              {role === "System admin" ||
              role === "Company owner" ||
              role === "Company admin" ? (
                <>
                  <Button onClick={routeWarehouseEdit}>Edit</Button>
                  <Button onClick={routeWarehouseList}>
                    List of warehouses
                  </Button>
                </>
              ) : (
                ""
              )}
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

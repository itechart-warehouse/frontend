import { clientApi } from "../../services/clientApi";
import * as React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { clearError, setError } from "../../store/errorSlice";

interface Warehouse {
  warehouse: {
    name: string;
    address: string;
    phone: string;
    area: string;
  };
  company: {
    name: string;
  };
  user: {
    first_name: string;
    last_name: string;
    id: string;
  };
}

function WarehouseCard() {
  const [warehouse, setWarehouse] = useState<Warehouse>({
    warehouse: {
      name: "",
      address: "",
      phone: "",
      area: "",
    },
    company: {
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
        dispatch(clearError());
        setWarehouse(res.data);
        console.log(res.data);
      });
  }, [id]);

  const routeWarehouseList = () => {
    //go back action
    navigate(-1);
  };
  const routeWarehouseEdit = () => {
    navigate(`/warehouse/${id}/edit`);
  };

  return (
    <>
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
          Area*
        </Typography>
        <Typography color="text.secondary">
          <Link to={`/warehouses/${id}/sections`}>
            {warehouse.warehouse.area}
          </Link>
        </Typography>
        <Typography
          variant="caption"
          display="block"
          gutterBottom
          color="text.secondary"
          sx={{ mb: 1.5 }}
        >
          * - press to see information about sections
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
    </>
  );
}

export default WarehouseCard;

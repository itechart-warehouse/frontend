import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
} from "@mui/material";
import { clientApi } from "../../services/clientApi";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { clearError } from "../../store/errorSlice";
import LoadingCard from "./LoadingCard";
import { Role } from "./types/Role.types";
import useMount from "../../services/isMountedHook";

const roleInit ={
  id: 0,
  name: "",
  manage_all: false,
  manage_all_users: false,
  manage_all_warehouses: false,
  manage_all_companys: false,
  manage_all_consigments: false,
  manage_all_roles: false,
  read_all: false,
  read_all_user: false,
  read_all_warehouse: false,
  read_all_company: false,
  read_all_consigment: false,
  read_all_roles: false,
  manage_your_company_user: false,
  manage_your_company_warehouses: false,
  manage_your_company: false,
  manage_your_warehouse: false,
  manage_your_company_consigment: false,
  manage_your_company_roles: false,
  read_your_company_user: false,
  read_your_company_warehouse: false,
  read_your_company_consigment: false,
  reg_consigment: false,
  check_consigment: false,
  place_consigment: false,
}


function RoleCard() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [role, setCurrentRole] = useState<Role>(roleInit);
  const jwt = useSelector((state: RootState) => state.user.user.jwt);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isMounted = useMount();

  useEffect(() => {
    clientApi.roles.getById(id, jwt).then((res) => {
      if (isMounted()) {
        dispatch(clearError());
        setCurrentRole(res.data);
        setIsLoaded(true);
      }
    });
  }, [id]);

  const routeRolesList = () => {
    navigate("/roles");
  };

  return (
    <>
      {isLoaded ? (
        <Card>
          <CardContent>
            <Typography variant="h4" component="div">
              {role.name}
            </Typography>
            <br />
            <Typography variant="h6" component="div">

            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">

            </Typography>
            <CardActions>
              <Button onClick={routeRolesList}>List of roles</Button>
            </CardActions>
          </CardContent>
        </Card>
      ) : (
        <LoadingCard />
      )}
    </>
  );
}

export default RoleCard;

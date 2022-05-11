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
import { setUserState } from "../../store/userSlice";
import { RootState } from "../../store";
import { clearError } from "../../store/errorSlice";
import LoadingCard from "./LoadingCard";
import { User } from "./types/User.types";
import useMount from "../../services/isMountedHook";

const userInit = {
  user: {
    first_name: "",
    last_name: "",
    birth_date: "",
    address: "",
    email: "",
  },
  company: {
    name: "",
  },
  role: {
    name: "",
  },
};

function UserCard() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentUser, setCurrentUser] = useState<User>(userInit);
  const jwt = useSelector((state: RootState) => state.user.user.jwt);
  const role = useSelector((state: RootState) => state.user.userRole.name);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isMounted = useMount();

  useEffect(() => {
    clientApi.user.getById(id, jwt).then((res) => {
      if (isMounted()) {
        dispatch(clearError());
        setCurrentUser(res.data);
        setIsLoaded(true);
      }
    });
  }, [id]);

  const routeUsersList = () => {
    navigate("/users");
  };
  const routeUserEdit = () => {
    navigate(`/users/${id}/edit`);
    dispatch(setUserState(currentUser));
  };

  return (
    <>
      {isLoaded ? (
        <Card>
          <CardContent>
            <Typography variant="h4" component="div">
              {currentUser.user.first_name} {currentUser.user.last_name}
            </Typography>
            <br />
            <Typography variant="h6" component="div">
              Birth Date
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {currentUser.user.birth_date}
            </Typography>
            <Typography variant="h6" component="div">
              Address
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {currentUser.user.address}
            </Typography>
            <Typography variant="h6" component="div">
              Email
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {currentUser.user.email}
            </Typography>
            <Typography variant="h6" component="div">
              Role
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {currentUser.role.name}
            </Typography>
            <Typography variant="h6" component="div">
              Company
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {currentUser.company.name}
            </Typography>
            <CardActions>
              {role === "System admin" ||
              role === "Company owner" ||
              role === "Company admin" ||
              role === "Warehouse admin" ? (
                <Button onClick={routeUserEdit}>Edit</Button>
              ) : (
                ""
              )}
              {role === "System admin" ||
              role === "Company owner" ||
              role === "Company admin" ? (
                <Button onClick={routeUsersList}>List of users</Button>
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

export default UserCard;

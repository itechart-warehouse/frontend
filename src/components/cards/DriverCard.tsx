import { clientApi } from "../../services/clientApi";
import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { setUserState } from "../../store/userSlice";
import { RootState } from "../../store";
import { clearError, setError } from "../../store/errorSlice";

interface Driver {
  driver: {
    first_name: string;
    last_name: string;
    passport_number: string;
    passport_info: string;
  };
  contractor: {
    name: string;
  };
}

function UserCard() {
  const [driver, setDriver] = useState<Driver>({
    driver: {
      first_name: "",
      last_name: "",
      passport_number: "",
      passport_info: "",
    },
    contractor: {
      name: "",
    },
  });
  const jwt = useSelector((state: RootState) => state.user.user.jwt);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   clientApi.driver
  //     .getById(id, jwt)
  //     .catch((err) => {
  //       if (err.response) {
  //         dispatch(setError([err.response.statusText]));
  //         console.log("response", err.response.statusText);
  //       } else if (err.request) {
  //         dispatch(setError(["Server is not working"]));
  //         console.log("request", err.request);
  //       } else {
  //         dispatch(setError([err.message]));
  //         console.log("message", err.message);
  //       }
  //       return Promise.reject(err);
  //     })
  //     .then((res) => {
  //       dispatch(clearError());
  //       setDriver(res.data);
  //       console.log(jwt);
  //     });
  // }, [id]);

  const routeDriversList = () => {
    navigate("/drivers");
  };

  return (
    <>
      <CardContent>
        <Typography variant="h4" component="div">
          {/*{driver.driver.first_name} {driver.driver.last_name}*/}
          Name
        </Typography>
        <br />
        <Typography variant="h6" component="div">
          Birth date
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Date
        </Typography>
        <Typography variant="h6" component="div">
          Passport
        </Typography>
        {/*<Typography sx={{ mb: 1.5 }} color="text.secondary">*/}
        {/*  {driver.driver.passport}*/}
        {/*</Typography>*/}
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Passport info
        </Typography>
        <Typography variant="h6" component="div">
          Contractor
        </Typography>
        {/*<Typography sx={{ mb: 1.5 }} color="text.secondary">*/}
        {/*  {driver.contractor.name}*/}
        {/*</Typography>*/}
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Contractor info
        </Typography>
        <CardActions>
          <Button onClick={routeDriversList}>Cancel</Button>
        </CardActions>
      </CardContent>
    </>
  );
}

export default UserCard;

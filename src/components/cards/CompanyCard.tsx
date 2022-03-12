import * as React from "react";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { clientApi } from "../../services/clientApi";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCompanyState } from "../../store/companySlice";
import { RootState } from "../../store";
import {clearError, setError} from "../../store/errorSlice";

interface Company {
  name: string;
  address: string;
  phone: string;
  email: string;
}

export default function CompanyCard() {
  const jwt = useSelector((state: RootState) => state.user.user.jwt);
  const [company, setCompany] = useState<Company>({
    address: "",
    email: "",
    name: "",
    phone: "",
  });
  const { id } = useParams();

  useEffect(() => {
    clientApi.company
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
        setCompany(res.data.company);
      });
  }, [id]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const routeCompanyList = () => {
    navigate("/companies");
  };
  const routeCompanyEdit = () => {
    navigate(`/companies/${id}/edit`);
    dispatch(setCompanyState(company));
  };

  return (
    <React.Fragment>
      <CardContent>
        <Typography variant="h4" component="div">
          {company.name}
        </Typography>
        <br />
        <Typography variant="h6" component="div">
          Phone Number
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {company.phone}
        </Typography>
        <Typography variant="h6" component="div">
          Address
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {company.address}
        </Typography>
        <Typography variant="h6" component="div">
          Email
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {company.email}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={routeCompanyEdit}>Edit</Button>
        <Button onClick={routeCompanyList}>Cancel</Button>
      </CardActions>
    </React.Fragment>
  );
}

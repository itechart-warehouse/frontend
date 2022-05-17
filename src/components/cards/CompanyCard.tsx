import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Card, CardContent, Button, Typography, CardActions,
} from "@mui/material";
import { clientApi } from "../../services/clientApi";
import { setCompanyState } from "../../store/companySlice";
import { RootState } from "../../store";
import { clearError } from "../../store/errorSlice";
import LoadingCard from "./LoadingCard";
import { Company } from "./types/Company.types";
import useMount from "../../services/isMountedHook";

const companyInitValues: Company = {address: "", email: "", name: "", phone: ""};

export default function CompanyCard() {
  const [isLoaded, setIsLoaded] = useState(false);
  const jwt = useSelector((state: RootState) => state.user.user.jwt);
  const role = useSelector((state: RootState) => state.user.userRole.name);
  const [company, setCompany] = useState<Company>(companyInitValues);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isMounted = useMount();

  useEffect(() => {
    clientApi.company.getById(id, jwt).then((res) => {
      if (isMounted()) {
        dispatch(clearError());
        setCompany(res.data.company);
        setIsLoaded(true);
      }
    });
  }, [id]);

  const routeCompanyList = () => {
    navigate("/companies");
  };
  const routeCompanyEdit = () => {
    navigate(`/companies/${id}/edit`);
    dispatch(setCompanyState(company));
  };

  return (
    <>
      {isLoaded ? (
        <Card>
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
            {role === "System admin" ||
            role === "Company owner" ||
            role === "Company admin" ? (
              <Button onClick={routeCompanyEdit}>Edit</Button>
            ) : (
              ""
            )}
            {role === "System admin" ? (
              <Button onClick={routeCompanyList}>List of companies</Button>
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

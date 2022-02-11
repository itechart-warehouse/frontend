import * as React from "react";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { clientApi } from "../../services/clientApi";

let paramsSearcher = new URLSearchParams(document.location.search);
let id = paramsSearcher.get("id");

interface ICompany {
  name: string;
  address: string;
  phone: string;
  email: string;
}

export default function CompanyCard() {
  const [company, setCompany] = useState<ICompany>({
    address: "",
    email: "",
    name: "",
    phone: "",
  });
  useEffect(() => {
    clientApi.company.getById(id).then((res) => {
      console.log(res.data);
      setCompany(res.data.company);
    });
  }, []);
  return (
    <React.Fragment>
      <CardContent>
        <Typography variant="h6" component="div">
          Phone Number
        </Typography>
        {/*TODO take data from backend*/}
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
        {/*TODO add button actions*/}
        <Button>Edit</Button>
      </CardActions>
    </React.Fragment>
  );
}

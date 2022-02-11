import * as React from "react";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { clientApi } from "../../services/clientApi";
import { useParams } from "react-router-dom";

interface Company {
  name: string;
  address: string;
  phone: string;
  email: string;
}

export default function CompanyCard() {
  const [company, setCompany] = useState<Company>({
    address: "",
    email: "",
    name: "",
    phone: "",
  });
  const { id } = useParams();

  useEffect(() => {
    clientApi.company.getById(id).then((res) => {
      setCompany(res.data.company);
    });
  }, []);
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
        {/*TODO add button actions*/}
        <Button>Edit</Button>
      </CardActions>
    </React.Fragment>
  );
}

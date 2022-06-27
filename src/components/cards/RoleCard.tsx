import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
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
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

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

const twinkleBlue = "#e9ecef";

const headStyle = {
  backgroundColor: twinkleBlue,
};

const rowStyle = {
  "&:last-child td, &:last-child th": { border: 0 },
};


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

  const routeEditRole = () => {
    navigate(`/roles/${id}/edit`);
  };

  return (
    <>
      {isLoaded ? (
        <Card>
          <CardContent>
            <></>
            <Typography variant="h4" component="div" align="center">
              {role.name}
            </Typography>
            <br />
            <Typography variant="h6" component="div">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 50}} aria-label="companiesPage table">
                <TableHead sx={headStyle}>
                  <TableRow>
                    <TableCell>
                      <Typography variant="h6" component="div"> Ability </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6" component="div" align="center"> Manage </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6" component="div" align="center"> Read </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Typography variant="body1" component="div"> Users </Typography>
                    </TableCell>
                    <TableCell align="center">
                      {role.manage_your_company_user ? <CheckIcon /> : <CloseIcon />}
                    </TableCell>
                    <TableCell align="center">
                      {role.read_your_company_user ? <CheckIcon /> : <CloseIcon />}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant="body1" component="div"> Company roles </Typography>
                    </TableCell>
                    <TableCell align="center">
                      {role.manage_your_company_roles ? <CheckIcon /> : <CloseIcon />}
                    </TableCell>
                    <TableCell align="center">
                      <CheckIcon />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant="body1" component="div"> Company</Typography>
                    </TableCell>
                    <TableCell align="center">
                      {role.manage_your_company ? <CheckIcon /> : <CloseIcon />}
                    </TableCell>
                    <TableCell align="center">
                      <CheckIcon />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant="body1" component="div"> Warehouses</Typography>
                    </TableCell>
                    <TableCell align="center">
                      {role.manage_your_company_warehouses ? <CheckIcon /> : <CloseIcon />}
                    </TableCell>
                    <TableCell align="center">
                      {role.read_your_company_warehouse ? <CheckIcon /> : <CloseIcon />}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant="body1" component="div"> Consignments</Typography>
                    </TableCell>
                    <TableCell align="center">
                      {role.manage_your_company_consigment ? <CheckIcon /> : <CloseIcon />}
                    </TableCell>
                    <TableCell align="center">
                      {role.read_your_company_consigment ? <CheckIcon /> : <CloseIcon />}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            </Typography>
            <CardActions>
              <Button onClick={routeRolesList}>List of roles</Button>
              <Button onClick={routeEditRole}>Edit</Button>
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

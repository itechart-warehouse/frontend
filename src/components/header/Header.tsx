import * as React from "react";
import {AppBar, Container, Menu, MenuItem, Grid} from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {clientApi} from "../../services/clientApi";
import {useDispatch, useSelector} from "react-redux";
import {logoutUser} from "../../store/loginSlice";
import {RootState} from "../../store";
import {useNavigate} from 'react-router-dom';

export default function Header() {
    const dispatch = useDispatch();
    const jwt = useSelector((state: RootState) => state.user.user.jwt);

    const logout = () => {
        clientApi.userData
            .logout(jwt)
            .then((res) => {
                dispatch(logoutUser())
            })
            .catch((err) => alert(err));
    };

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const navigate = useNavigate();
    const companiesRoute = () => {
        navigate("/companies")
    }
    const createCompanyRoute = () => {
        navigate("/company/create")
    }

    const rootRoute = () => {
        navigate("/home")
    }

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Grid container spacing={2}>
                        <Grid item xs={11}>
                            <Button onClick={rootRoute} color="inherit">
                                WareHouse
                            </Button>
                            <Button
                                id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                                color="inherit"
                            >
                                Companies
                            </Button>
                        </Grid>
                        <Grid item xs={1}>
                            <Button onClick={logout} color="error" variant="contained">
                                Logout
                            </Button>
                        </Grid>

                    </Grid>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={() => {
                            handleClose()
                            companiesRoute()
                        }}>Listing</MenuItem>
                        <MenuItem onClick={() => {
                            createCompanyRoute()
                            handleClose()
                        }}>Create company</MenuItem>
                    </Menu>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

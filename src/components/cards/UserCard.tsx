import {clientApi} from "../../services/clientApi";
import * as React from "react";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";

interface User {
    user: {
        first_name: string,
        last_name: string,
        birth_date: string,
        address: string,
        email: string,
    },
    company: {
        name: string;
    },
    role: {
        name: string
    }

}

function UserCard() {
    const [currentUser, setCurrentUser] = useState<User>({
        user: {
            first_name: '',
            last_name: '',
            birth_date: '',
            address: '',
            email: '',
        },
        company: {
            name: ''
        },
        role: {
            name: ''
        },
    })

    const {id} = useParams();

    useEffect(() => {
        clientApi.user.getById(id)
            .then((res) => {
                setCurrentUser(res.data);
            })
    },[id])

    const navigate = useNavigate()
    const routeUsersList = () => {
        navigate("/users")
    }

    console.log(currentUser);

    return (
        <>
            <CardContent>
                <Typography variant="h4" component="div">
                    {currentUser.user.first_name} {currentUser.user.last_name}
                </Typography>
                <br/>
                <Typography variant="h6" component="div">
                    Birth Date
                </Typography>
                <Typography sx={{mb: 1.5}} color="text.secondary">
                    {currentUser.user.birth_date}
                </Typography>
                <Typography variant="h6" component="div">
                    Address
                </Typography>
                <Typography sx={{mb: 1.5}} color="text.secondary">
                    {currentUser.user.address}
                </Typography>
                <Typography variant="h6" component="div">
                    Email
                </Typography>
                <Typography sx={{mb: 1.5}} color="text.secondary">
                    {currentUser.user.email}
                </Typography>
                <Typography variant="h6" component="div">
                    Role
                </Typography>
                <Typography sx={{mb: 1.5}} color="text.secondary">
                    {currentUser.role.name}
                </Typography>
                <Typography variant="h6" component="div">
                    Company
                </Typography>
                <Typography sx={{mb: 1.5}} color="text.secondary">
                    {currentUser.company.name}
                </Typography>
                <CardActions>
                    {/*TODO add user edit action*/}
                    <Button>Edit</Button>
                    <Button onClick={routeUsersList}>Cancel</Button>
                </CardActions>
            </CardContent>
        </>
    )
}

export default UserCard;
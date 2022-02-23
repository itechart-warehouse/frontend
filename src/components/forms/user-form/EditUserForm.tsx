import {useFormik} from "formik";
import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import * as yup from "yup";
import {clientApi} from "../../../services/clientApi";
import {useNavigate, useParams} from "react-router-dom";
import {RootStateOrAny, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";

interface Values {
    firstName: string;
    lastName: string;
    address: string;
    birthDate: string;
    userRoleId: number;
}

interface Roles {
    id: number;
    name: string;
}

const validationSchema = yup.object({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    address: yup.string().required("Address is required"),
    birthDate: yup.string().required("Birth date is required"),
});

function EditUserForm() {
    
    const [roles, setRoles] = useState<Roles[]>([]);
    const navigate = useNavigate();
    const {id} = useParams();
    const user = useSelector((state: RootStateOrAny) => state.userCard.userCard);
    const formik = useFormik({
        initialValues: {
            firstName: user.user.first_name,
            lastName: user.user.last_name,
            address: user.user.address,
            birthDate: user.user.birth_date,
            userRoleId: user.user.user_role_id,
        },

        validationSchema: validationSchema,
        onSubmit: (data: Values) => {
            clientApi.user
                .editUserById(id, data)
                .then((res) => {
                    res.status === 200 && routeUsersList();
                })
                .catch((err) => {
                    if (err.response) {
                        alert(err.response.data);
                    } else if (err.request) {
                        console.log(err.request);
                        alert("Server is not working");
                    } else {
                        console.log(err.message);
                        alert(err.message);
                    }
                });
        },
    });

    useEffect(() => {
        clientApi.user.getAllRoles().then((response) => {
            setRoles(response.data.roles);
        });
    }, []);

    const routeUsersList = () => {
        navigate("/users");
    };

    return (
        <form onSubmit={formik.handleSubmit}>
            <TextField
                fullWidth
                id="firstName"
                name="firstName"
                label="First Name"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                helperText={formik.touched.firstName && formik.errors.firstName}
                sx={{mb: 3}}
            />
            <TextField
                fullWidth
                id="lastName"
                name="lastName"
                label="Last Name"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                helperText={formik.touched.lastName && formik.errors.lastName}
                sx={{mb: 3}}
            />
            <FormControl fullWidth>
                <InputLabel id="role">Role</InputLabel>
                <Select
                    labelId="role"
                    id="userRoleId"
                    name="userRoleId"
                    value={formik.values.userRoleId}
                    label="Role"
                    onChange={formik.handleChange}
                    sx={{mb: 3}}
                >
                    {roles.map((role) => (
                        <MenuItem key={role.id} value={role.id}>
                            {role.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TextField
                fullWidth
                id="address"
                name="address"
                label="Address"
                value={formik.values.address}
                onChange={formik.handleChange}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
                sx={{mb: 3}}
            />
            <TextField
                fullWidth
                id="birthDate"
                name="birthDate"
                label="Birth Date"
                value={formik.values.birthDate}
                onChange={formik.handleChange}
                error={formik.touched.birthDate && Boolean(formik.errors.birthDate)}
                helperText={formik.touched.birthDate && formik.errors.birthDate}
                sx={{mb: 3}}
            />

            <Button
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
                style={{margin: "0 0 10px 0"}}
            >
                Submit
            </Button>
            <Button onClick={routeUsersList} variant="outlined" fullWidth>
                Cancel
            </Button>
        </form>
    );
}

export default EditUserForm;

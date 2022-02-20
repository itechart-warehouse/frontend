import {useFormik} from "formik";
import {
  Button,
  Grid,
  TextField,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select
} from "@mui/material";
import * as yup from "yup";
import {clientApi} from "../../../services/clientApi";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import React, { useEffect, useState } from "react";


interface Values {
    userEmail: string;
    userPassword: string;
    firstName: string;
    lastName: string;
    birthDate: string;
    address: string;
    company_id: string;
    role_id: string;
}

interface Company {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
}

interface Roles {
  id: number;
  name: string;
}

const validationSchema = yup.object({
    userEmail: yup
        .string()
        .email("Enter a valid email")
        .required("Email is required"),
    userPassword: yup
        .string()
        .min(6, "Password should be of minimum 8 characters length")
        .required("Password is required"),
    firstName: yup
        .string()
        .required("First name is required"),
    lastName: yup
        .string()
        .required("Last name is required"),
    birthDate: yup
        .string()
        .required("Birth date is required"),
    address: yup
        .string()
        .required("Address is required"),
    company_id: yup
        .string()
        .required("Company name is required"),
    role_id: yup
        .string()
        .required("Company address is required"),
    });

function CreateUserForm() {
    const navigate = useNavigate();
    const routeUsersList = () => {
        navigate('/users');
    };
    const [companies, setCompanies] = useState<Company[]>([]);
    const [roles, setRoles] = useState<Roles[]>([]);

    useEffect(() => {
      clientApi.user.getInfoToCreate().then((response) => {
        setCompanies(response.data.companies);
        setRoles(response.data.roles);
      });
    }, []);

    const [role_id, setRole] = React.useState('');
    const [company_id, setCompany] = React.useState('');
    const handleChange = (event: any) => {
      setRole(event.target.value);
    };

    const handleChangeCompany = (event: any) => {
      setCompany(event.target.value);
    };
    const formik = useFormik({
        initialValues: {
            userEmail: "",
            userPassword: "",
            firstName: "",
            lastName: "",
            birthDate: "",
            address: "",
            company_id: "",
            role_id: "",
        },
        validationSchema: validationSchema,
        onSubmit: (data: Values) => {
            clientApi.user
                .create(data)
                .then((res) => {
                    res.status === 201 && routeUsersList()
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
    formik.values.company_id = company_id;
    formik.values.role_id = role_id;
    return (
        <form onSubmit={formik.handleSubmit}>
            <TextField
                fullWidth
                id="userEmail"
                name="userEmail"
                label="User Email"
                value={formik.values.userEmail}
                onChange={formik.handleChange}
                error={formik.touched.userEmail && Boolean(formik.errors.userEmail)}
                helperText={formik.touched.userEmail && formik.errors.userEmail}
                sx={{mb: 3}}
            />
            <TextField
                fullWidth
                id="userPassword"
                name="userPassword"
                label="User Password"
                type="password"
                value={formik.values.userPassword}
                onChange={formik.handleChange}
                error={formik.touched.userPassword && Boolean(formik.errors.userPassword)}
                helperText={formik.touched.userPassword && formik.errors.userPassword}
                sx={{mb: 3}}
            />
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

            <FormControl fullWidth>
                <InputLabel id="Company">Company</InputLabel>
                  <Select
                    value={formik.values.company_id}
                    label="Role"
                    onChange={handleChangeCompany}
                    sx={{mb: 3}}
                  >
                  { companies.length && companies.map((company) => (
                    <MenuItem key={company.id} value={company.id}>
                      {company.name}
                    </MenuItem>
                  ))
                  }
              </Select>
            </FormControl>

            <FormControl fullWidth>
                <InputLabel id="Role">Role</InputLabel>
                  <Select
                    value={formik.values.role_id}
                    label="Role"
                    onChange={handleChange}
                    sx={{mb: 3}}
                  >
                  { roles.length && roles.map((role) => (
                    <MenuItem key={role.id} value={role.id}>
                      {role.name}
                    </MenuItem>
                  ))
                  }
              </Select>
            </FormControl>

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

export default CreateUserForm;

import {useFormik} from "formik";
import {Button, Grid, TextField, Typography} from "@mui/material";
import * as yup from "yup";
import {clientApi} from "../../../services/clientApi";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import React from "react";

interface Values {
    userEmail: string;
    userPassword: string;
    firstName: string;
    lastName: string;
    birthDate: string;
    address: string;
    companyName: string;
    companyAddress: string;
    companyPhone: string;
    companyEmail: string;
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
    companyName: yup
        .string()
        .required("Company name is required"),
    companyAddress: yup
        .string()
        .required("Company address is required"),
    companyPhone: yup
        .string()
        .required("Company phone is required"),
    companyEmail: yup
        .string()
        .email("Enter a valid email")
        .required("Company email is required"),
});


function CreateCompanyForm() {
    const formik = useFormik({
        initialValues: {
            userEmail: "",
            userPassword: "",
            firstName: "",
            lastName: "",
            birthDate: "",
            address: "",
            companyName: "",
            companyAddress: "",
            companyPhone: "",
            companyEmail: "",
        },
        validationSchema: validationSchema,
        onSubmit: (data: Values) => {
            clientApi.company
                .create(data).catch((err) => {
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
    const navigate = useNavigate();
    const routeRoot = () => {
        navigate('/');
    };
    return (
        <form onSubmit={formik.handleSubmit}>
            <TextField
                fullWidth
                id="companyName"
                name="companyName"
                label="Company Name"
                value={formik.values.companyName}
                onChange={formik.handleChange}
                error={formik.touched.companyName && Boolean(formik.errors.companyName)}
                helperText={formik.touched.companyName && formik.errors.companyName}
                sx={{mb: 3}}
            />

            <TextField
                fullWidth
                id="companyEmail"
                name="companyEmail"
                label="Company Email"
                value={formik.values.companyEmail}
                onChange={formik.handleChange}
                error={formik.touched.companyEmail && Boolean(formik.errors.companyEmail)}
                helperText={formik.touched.companyEmail && formik.errors.companyEmail}
                sx={{mb: 3}}
            />
            <TextField
                fullWidth
                id="companyPhone"
                name="companyPhone"
                label="Company Phone"
                value={formik.values.companyPhone}
                onChange={formik.handleChange}
                error={formik.touched.companyPhone && Boolean(formik.errors.companyPhone)}
                helperText={formik.touched.companyPhone && formik.errors.companyPhone}
                sx={{mb: 3}}
            />
            <TextField
                fullWidth
                id="companyAddress"
                name="companyAddress"
                label="Company Address"
                value={formik.values.companyAddress}
                onChange={formik.handleChange}
                error={formik.touched.companyAddress && Boolean(formik.errors.companyAddress)}
                helperText={formik.touched.companyAddress && formik.errors.companyAddress}
                sx={{mb: 3}}
            />
            <Typography variant="h4" component="div" gutterBottom color="primary" align="center">User data</Typography>
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



            <Button
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
                style={{margin: "0 0 10px 0"}}
            >
                Submit
            </Button>
            <Button onClick={routeRoot} variant="outlined" fullWidth>
                Cancel
            </Button>
        </form>
    );
}

export default CreateCompanyForm;
import {useFormik} from 'formik';
import {Button, TextField} from "@mui/material";
import * as yup from 'yup';
import {clientApi} from "../../../services/clientApi";
import {useState} from "react";

interface Values {
    email: string,
    password: string
}

const validationSchema = yup.object({
    email: yup
        .string()
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string()
        .min(6, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
});


function LoginForm() {

    const [isLoggedIn, setLogged] = useState(false)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (user: Values) => {
            clientApi.userData.login(user)
                .then((res) => {
                    console.log(res.headers.authorization)
                    localStorage.setItem("key", res.headers.authorization)
                    setLogged(true)
                    //TODO Set new context to true
                })
                .catch((err) => console.log(err));
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <TextField
                fullWidth
                id="email"
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                sx={{mb:3}}
            />
            <TextField
                fullWidth
                id="password"
                name="password"
                label="Password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                sx={{mb:3}}
            />
            <Button color="primary" variant="contained" fullWidth type="submit">
                Submit
            </Button>
        </form>
    );

};

export default LoginForm
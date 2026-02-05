
import { registerUser } from "../store/slices/userSlice";
import { useAppDispatch } from "../store/hooks";

import { useNavigate } from "react-router-dom";

import { useFormik } from 'formik';
import * as Yup from 'yup';

import RegisterForm from "../components/RegisterForm";

import { Typography, Box } from "@mui/material";

const RegisterPage = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .min(3, 'Not less than 3 characters')
                .max(15, 'Must be 15 characters or less')
                .required('Required'),
            password: Yup.string()
                .min(3, 'Not less than 3 characters')
                .max(20, 'Must be 20 characters or less')
                .required('Required'),
        }),
        onSubmit: async (values) => {
            try {
                await dispatch(registerUser(values)).unwrap();

                navigate('/');
            } catch (error) {
                console.log('Error: ' + error);
            }
        },
    });

    return (
        <div className="register">
            <Typography variant="h1"
                sx={{
                    fontSize: '40px',
                    textAlign: 'center',
                    marginTop: '20px'
                }}>
                RegisterPage
            </Typography>
            <Box
                component='section'
                sx={{
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                <RegisterForm formik={formik} />
            </Box>


        </div>
    )
}

export default RegisterPage
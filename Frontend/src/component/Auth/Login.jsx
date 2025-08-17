import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


import { Container, Box, Typography, TextField, Button, Checkbox, FormControlLabel } from '@mui/material';
import { login } from '../../Controller/auth';


export const Login = () => {

   
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isValidEmail(Email) === false) {
            alert("Enter valid Email")
            return
        }
        try {
            const response = await login({
                email: Email,
                password: Password
            })

            localStorage.setItem("token", response.accessToken)
            alert("Login Sucessful")

            localStorage.setItem("user", JSON.stringify (response.user))
           
            
            navigate('/dashboard')

        } catch (error) {
            console.log(error)
            alert(error)
        }
    };

    function isValidEmail(Email) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(Email);
    }

    return (
        <Box sx={{
            width: '100vw',
            height: '100vh',
            display: "flex",
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#f5f5f5',
        }}>
            <Container
                maxWidth={false}
                sx={{
                    maxWidth: '680px',
                    borderRadius: '6px',
                    backgroundColor: 'white',
                    padding: 4,
                    boxShadow: 3,
                }}
            >
                <Box
                    sx={{

                        maxWidth: '360px',

                        backgroundColor: 'white',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: 4,
                        margin: '0 auto',
                    }}
                >
                   

                    <Typography fontSize="24px" fontWeight={500}>
                        Welcome back!
                    </Typography>

                    <Typography fontSize="15px" fontWeight={400} mb={4} color="text.secondary">
                        Please sign-in to your account
                    </Typography>

                    {/* <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, width: '100%' }}>
                        <Button
                            variant="outlined"
                            sx={{
                                flex: 1,
                                textTransform: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <img src='google.svg' alt="Google" style={{ width: 16, height: 16, marginRight: 10 }} />
                            Google
                        </Button>

                        <Button
                            variant="outlined"
                            sx={{
                                flex: 1,
                                textTransform: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <img src='microsoft.svg' alt="Microsoft" style={{ width: 16, height: 16, marginRight: 10 }} />
                            Microsoft
                        </Button>
                    </Box>

                    <Typography mt={2} mb={2} color="text.secondary">
                        or
                    </Typography> */}

                    <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', rowGap: '16px' }} >

                        <TextField
                            fullWidth
                            label="Email"
                            variant="outlined"
                            value={Email}
                            size="small"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            label="Password"
                            type="Password"
                            variant="outlined"
                            value={Password}
                            size="small"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <Box display="flex" justifyContent="space-between" alignItems="center" width="100%" mt={2}>
                            <FormControlLabel
                                control={<Checkbox />}
                                label={
                                    <Typography fontSize="14px" component="span">
                                        Remember me
                                    </Typography>
                                }
                            />
                            <a href="/forgot-Password" style={{ color: '#1976d2', fontSize: '14px' }}>
                                Forgot Password?
                            </a>
                        </Box>



                        <Button
                            fullWidth
                            variant="contained"
                            type="submit"
                            sx={{ mt: 2 }}
                        >
                            Log In
                        </Button>
                        <Typography fontSize="14px" mt={2} textAlign={'center'} >
                            Don't you have an account?{' '}
                            <Link to="/signup" style={{ color: '#1976d2', textDecoration: 'none', fontWeight: 500 }}>
                                Sign Up
                            </Link>
                        </Typography>

                    </form>
                </Box>
            </Container>
        </Box>
    );
};

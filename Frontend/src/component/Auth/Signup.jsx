import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Box, Typography, TextField, Button, Checkbox, FormControlLabel } from '@mui/material';
import { signup } from '../../Controller/auth';




export const Signup = () => {
    const [formdata, setformdata] = useState({
        Username: '',
        email: "",
        password: '',
        confirmPassword: '',
        checkbox: false

    })
   

   
    
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formdata.checkbox) {
            alert("You must agree to terms")
            return
        }
        if (formdata.password !== formdata.confirmPassword) {
            alert("Password is not matched with confirm Password")
            return
        }
        if (isValidEmail(formdata.email) === false) {
            alert("Enter your valid Email")
            return
        }

       try {
        const response = await signup(formdata);

        console.log(response);
        localStorage.setItem("token", response.accessToken)
        localStorage.setItem("user", response.user)
       
         alert("sign up sucessfull")
        navigate('/dashboard')

       } catch (error) {
          console.log(error)
           alert( error)
       }


    };


    function isValidEmail(email) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
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
                        Welcome to BookS! 👋🏻
                    </Typography>

                    <Typography fontSize="15px" fontWeight={400} mb={4} color="text.secondary">
                        Get started – it's free
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
                            label="Name"
                            required
                            variant="outlined"
                            value={formdata.Username}
                            size="small"
                            onChange={(e) =>
                                setformdata({ ...formdata, Username: e.target.value })
                            }

                        />
                        <TextField
                            fullWidth
                            label="Email"
                            required
                            variant="outlined"
                            value={formdata.email}
                            size="small"
                            onChange={(e) =>
                                setformdata({ ...formdata, email: e.target.value })
                            }

                        />
                        <TextField
                            fullWidth
                            label="Password"
                            type="Password"
                            required
                            variant="outlined"
                            value={formdata.password}
                            size="small"
                            onChange={(e) => setformdata({
                                ...formdata, password: e.target.value
                            })}
                        />
                        <TextField
                            fullWidth
                            label="Confirm Password"
                            type="Password"
                            required
                            variant="outlined"
                            value={formdata.confirmPassword}
                            size="small"
                            onChange={(e) => setformdata({
                                ...formdata, confirmPassword: e.target.value
                            })}
                        />
                        <FormControlLabel checked={formdata.checkbox} onChange={(e) => setformdata({
                            ...formdata, checkbox: e.target.checked
                        })}

                            control={<Checkbox />}
                            label={
                                <Typography fontSize="14px">
                                    By proceeding, you agree to the <a href="/terms" style={{ color: '#1976d2' }}>Terms of Service</a> and <a href="/privacy" style={{ color: '#1976d2' }}>Privacy Policy</a>.
                                </Typography>
                            }
                        />

                        <Button
                            fullWidth
                            variant="contained"
                            type="submit"
                            sx={{ mt: 2 }}
                        >
                            Signup
                        </Button>
                        <Typography fontSize="14px" mt={2} textAlign={'center'} >
                            Already have an account?{' '}
                            <Link to="/login" style={{ color: '#1976d2', textDecoration: 'none', fontWeight: 500 }}>
                                Log in
                            </Link>
                        </Typography>

                    </form>
                </Box>
            </Container>
        </Box>
    );
};

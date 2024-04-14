import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import React from 'react';
import { API_SIGN_UP, API_SIGN_UP_OTP } from '../global/constants';
import axios from 'axios';
import { MuiOtpInput } from 'mui-one-time-password-input'


const defaultTheme = createTheme();
const { useState } = React;

export default function Signup() {
  const [signupStatus, setSignupStatus] = useState(1); // 1: signup form, 2: signup otp

  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');

  const handleFirstSignupSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // console.log({
    //   name: data.get('name'),
    //   email: data.get('email'),
    //   password: data.get('password'),
    //   gender: data.get('gender'),
    //   birthday: data.get('birthday'),
    // });

    axios.put(API_SIGN_UP, { 
      name: data.get('name'),
      email: data.get('email'),
      password: data.get('password'),
      gender: data.get('gender'),
      birthday: data.get('birthday')
    })
    .then(function (response) {
      console.log(response);
      setSignupStatus(2);

    })
    .catch(function (error) {
      console.log(error);
    });

  }

  const [otp, setOtp] = useState('');

  const handleOTPChange = (newValue) => {
    setOtp(newValue)
  }


  const handleComplete = (value) => {
    console.log(value);
    axios.put(API_SIGN_UP_OTP, { 
      otp: value,
      email: email
    
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          {signupStatus == 1 ? 
          <Box component="form" noValidate onSubmit={handleFirstSignupSubmit} sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="Name"
                  label="Name"
                  autoFocus
                />
              </Grid>
              
              
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={handleEmailChange} 
                />
              </Grid>

              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">

                  <DatePicker sx={{ width: 1 }}
                    required
                    fullWidth
                    label="Birthday"
                    name="birthday"
                    id="birthday"
                    />
                </LocalizationProvider>

      
              </Grid>        
                

              <Grid item xs={12}>
                <FormControl fullWidth>

                  <InputLabel id="label_gender">Gender</InputLabel>
                  <Select
                    labelId="label_gender"
                    id="gender"
                    name="gender"
                    value={gender}
                    label="Gender"
                    onChange={handleGenderChange}
                    fullWidth
                  >
                    <MenuItem value={1}>Male</MenuItem>
                    <MenuItem value={2}>Female</MenuItem>
                  </Select>
                  </FormControl>

              </Grid>

              <Grid item xs={12}>
                  
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="comfirmPassword"
                  label="Comfirm Password"
                  type="password"
                  id="confirm-password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
        </Box> : 
            <MuiOtpInput value={otp} onChange={handleOTPChange} onComplete={handleComplete} length={6}
             style={{marginTop:20}} />
          }
          </Box>
        
        </Grid>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1562519819-016930ada31b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </Grid>
    </ThemeProvider>
  );
}
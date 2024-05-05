import HeaderBar from '../components/HeaderBar';
import './Common.css';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { cyan, yellow, orange } from '@mui/material/colors';
import { Grid } from "@material-ui/core";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React from 'react';
import { styled } from '@mui/material/styles';
import UserPageNav from '../components/UserPageNav';
import theme from '../components/Theme'; 
import Divider from '@mui/material/Divider';


const { useState } = React;

const tagTheme = createTheme({
  palette: {
    primary: {
      main: yellow[400],
    },
    secondary:{
      main: cyan[100],
    },
    warning:{
      main: orange[400]
    }
  },
});

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

function AccountSetting() {
  const style2 = { 
    padding: "1rem 0 0 0" 
  };
  const instyle = { 
    padding: "3rem 0 0 0" 
  };
  const dividerStyle = {
    p: 0,
    width: '100%',
    borderRadius: 2,
    border: '1px solid',
    borderColor: 'divider',
    backgroundColor: 'background.paper',
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };
  const defaultTheme = createTheme();


  const [name, setName] = useState('MyName');
  const [phone, setPhone] = useState('091111111');
  const [email, setEmail] = useState('hello@gmail.com');
  const [gender, setGender] = useState('female');
  const [tag, setTag] = useState('tag');



  return (
    <ThemeProvider theme={theme}>
    <HeaderBar />
    <UserPageNav selectedTab={4}/> 
    <div className='Main'>
        <CssBaseline />

    <Grid container spacing={2}>
        <Grid item xs={12}>
            <Box 
                component="section"
                sx={{
                my: 0,
                mx: 4,
                display: 'flex',
                flexDirection: 'column'
                }}
            >
              
                <Typography component="h2" variant="h5" align="left">
                  帳號設定
                </Typography> 
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1}} >

                        <TextField
                                fullWidth
                                margin="normal"
                                id="outlined-controlled"
                                label="Name"
                                value={name}
                                onChange={(event) => {
                                setName(event.target.value);
                                }}
                            />
                        <TextField
                                fullWidth
                                margin="normal"
                                id="outlined-controlled"
                                label="Email"
                                value={email}
                                onChange={(event) => {
                                setEmail(event.target.value);
                                }}
                            />
                        <TextField
                                fullWidth
                                margin="normal"
                                id="outlined-controlled"
                                label="Phone"
                                value={phone}
                                onChange={(event) => {
                                setPhone(event.target.value);
                                }}
                            />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Modify
                        </Button>
                    </Box>
            </Box>
            
        </Grid>
        <Grid item xs={12}>
            <Box 
                component="section"
                sx={{
                my: 0,
                mx: 4,
                display: 'flex',
                flexDirection: 'column'
                }}
            >

                <Divider sx={dividerStyle}/>
              
                <Typography component="h2" variant="h5" align="left">
                  社群綁定
                </Typography> 
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }} >

                        <TextField
                                fullWidth
                                margin="normal"
                                id="outlined-controlled"
                                label="Name"
                                value={name}
                                onChange={(event) => {
                                setName(event.target.value);
                                }}
                            />
                        <TextField
                                fullWidth
                                margin="normal"
                                id="outlined-controlled"
                                label="Email"
                                value={email}
                                onChange={(event) => {
                                setEmail(event.target.value);
                                }}
                            />
                        <TextField
                                fullWidth
                                margin="normal"
                                id="outlined-controlled"
                                label="Phone"
                                value={phone}
                                onChange={(event) => {
                                setPhone(event.target.value);
                                }}
                            />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Modify
                        </Button>
                    </Box>
            </Box>
            
        </Grid>
        <Grid item xs={12}>
            <Box 
                component="section"
                sx={{
                my: 0,
                mx: 4,
                display: 'flex',
                flexDirection: 'column'
                }}
            >
                <Divider sx={dividerStyle}/>
                <Typography component="h2" variant="h5" align="left">
                  刪除帳號
                </Typography> 
                <Button
                    variant="outlined" color="error"
                    sx={{ mt: 3, mb: 2, width: 1/3}}
                >
                    刪除此帳號
                </Button>
            </Box>
            
        </Grid>
    </Grid>
    </div>
    </ThemeProvider>
  );
}

export default AccountSetting;
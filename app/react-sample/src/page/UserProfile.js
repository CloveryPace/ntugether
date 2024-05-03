import HeaderBar from '../components/HeaderBar';
import './Common.css';

import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { cyan, yellow, orange } from '@mui/material/colors';
import { Divider, Grid, Paper } from "@material-ui/core";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import React from 'react';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import UserPageNav from '../components/UserPageNav';
import theme from '../components/Theme'; 
import './Common.css';

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

function UserProfile() {
  const style2 = { 
    padding: "1rem 0 0 0" 
  };
  const instyle = { 
    padding: "3rem 0 0 0" 
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
    <UserPageNav selectedTab={0}/> 

    <div className='Main'>
        <CssBaseline />

    <Grid container spacing={2}>
        <Grid item xs={12} md={2} justifyContent="center">
            <Box   sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%' 
            }}>

                <Avatar
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
                sx={{ width: 128, height: 128 }}
                />
                <Button
                    sx={{ mt: 3, mb: 2 }}
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    >
                    Upload file
                    <VisuallyHiddenInput type="file" />
                    </Button>
            </Box>
                
        </Grid>
        <Grid item xs={10}>
            <Box
                sx={{
                my: 0,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                }}
            >
                <Stack spacing={2}>

                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>

                        <TextField
                                margin="normal"
                                fullWidth
                                id="outlined-controlled"
                                label="Name"
                                value={name}
                                onChange={(event) => {
                                setName(event.target.value);
                                }}
                            />
                        <TextField
                                margin="normal"
                                fullWidth
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
                        
                            
                            
                        <TextField
                                fullWidth
                                margin="normal"
                                id="outlined-controlled"
                                label="Gender"
                                value={gender}
                                onChange={(event) => {
                                setGender(event.target.value);
                                }}
                            />

                        <TextField
                                fullWidth
                                margin="normal"
                                id="outlined-multiline-static"
                                label="About me"
                                multiline
                                rows={4}
                                defaultValue="Default Value"
                                />
                        <TextField
                                fullWidth
                                margin="normal"
                                id="outlined-controlled"
                                label="Tag"
                                value={tag}
                                onChange={(event) => {
                                setTag(event.target.value);
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
                </Stack> 
            </Box>
            
            
        </Grid>
       
    </Grid>
    </div>
    </ThemeProvider>
  );
}

export default UserProfile;
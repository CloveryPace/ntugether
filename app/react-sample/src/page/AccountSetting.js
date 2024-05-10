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
import { useTranslation } from 'react-i18next';
import { USER } from '../global/constants';
import { getAuthToken } from '../utils';
import axios from 'axios';

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

  const { t, i18n } = useTranslation();


  const [name, setName] = useState('MyName');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [userToken, setUserToken] = useState(getAuthToken());

  const confirmDelete = () => {
    if (window.confirm(t("確定要刪除帳號嗎?"))) {
      deleteUser();
    }
  }


  const deleteUser = () => {
    const token = userToken;
    
    axios.delete(USER,{
      headers: { "authorization": `Bearer ${token}`}
    })
    .then(function (response) {
      
      alert("success");
      window.location.assign('/login');
    })
    .catch(function (err) {
      console.log(err);
      alert("error");
    });
 
  }


  return (
    <ThemeProvider theme={theme}>
    <HeaderBar />
    <UserPageNav selectedTab={3}/> 
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
                  {t('帳號設定')}
                </Typography> 
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1}} >

                        <TextField
                                fullWidth
                                margin="normal"
                                id="outlined-controlled"
                                label={t('姓名')}
                                value={name}
                                onChange={(event) => {
                                setName(event.target.value);
                                }}
                            />
                        <TextField
                                fullWidth
                                margin="normal"
                                id="outlined-controlled"
                                label={t('新密碼')}
                                type="password"
                                value={email}
                                onChange={(event) => {
                                setEmail(event.target.value);
                                }}
                            />
                        <TextField
                                fullWidth
                                margin="normal"
                                id="outlined-controlled"
                                label={t('再次輸入新密碼')}
                                type="password"
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
                            {t('修改')}
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
                  {t('社群綁定')}
                </Typography> 
                    <Box sx={{ mt: 1 }} >
                    <Button variant="outlined" fullWidth sx={{color: 'rgba(0, 0, 0, 0.87)'}} size="large"> <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" style={{width: '18px', height: '18px', marginRight: '5px'}} />{t('綁定 Google 帳號')}</Button>
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
                  {t('刪除帳號')}
                </Typography> 
                <Button
                    variant="outlined" color="error"
                    sx={{ mt: 3, mb: 2, width: 1/3}}
                    onClick={() => {confirmDelete()}}
                >
                    {t('刪除此帳號')}
                </Button>
            </Box>
            
        </Grid>
    </Grid>
    </div>
    </ThemeProvider>
  );
}

export default AccountSetting;
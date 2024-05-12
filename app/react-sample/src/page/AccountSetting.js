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
import PasswordAndCheck from '../components/PasswordAndCheck';

const { useState } = React;

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
  const [email, setEmail] = useState('MyName');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


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

                        {/* <TextField
                                fullWidth
                                margin="normal"
                                id="outlined-controlled"
                                label={t('電子郵件')}
                                value={email}
                                onChange={(event) => {
                                setEmail(event.target.value);
                                }}
                            /> */}
                        <Box sx={{ mt: 1 }} >
                        <PasswordAndCheck setPassword={setPassword} setConfirmPassword={setConfirmPassword}/>
                        </Box>
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
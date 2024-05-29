import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import theme from '../components/Theme'; 
import { API_RESET_PASSWORD, API_FORGET_PASSWORD } from '../global/constants';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import Loading from '../components/Loading';
import PasswordAndCheck from '../components/PasswordAndCheck';

const { useState } = React;

export default function ForgetPassword() {
  const { t, i18n } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');

  const [confirmPassword, setConfirmPassword] = useState('');
  const [forgetpwdStatus, setForgetpwdStatus] = useState(1);  // 1: initial, 2: success
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);


  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    axios.get(API_FORGET_PASSWORD, {params:{ 
        email: email,
      
      }})
      .then(function (response) {
        console.log(response);
        setForgetpwdStatus(2);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
      });
  };

  const handleChangeSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    if(password !== confirmPassword || password === '' || confirmPassword === ''){
      setError(true);
      console.log('error');
    }else{
      setError(false);
    }

    if (error) {
      console.log(error);
    }else{
    axios.post(API_RESET_PASSWORD, { 
        email: email,
        code: code,
        newPassword: password
      })
      .then(function (response) {
        console.log(response);
        setLoading(false);
        window.location.assign('/login');
      })
      .catch(function (error) {
        setLoading(false);
        console.log(error);
      });
    }
  }


  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
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
              {t('忘記密碼')}
            </Typography>
            <Typography variant="body1">
            {t('回到')} <Link href={'./login'} variant="body2">
                    {t('登入')}
                  </Link> {t('或')} <Link href={'./signup'} variant="body2">
                  {t('註冊')}
                  </Link>。
            </Typography>

            {forgetpwdStatus === 2 ?

            <Box component="form" noValidate onSubmit={handleChangeSubmit} sx={{ mt: 4,  width: '100%' }}>
            <Typography variant="body2">
            {t('已經發送驗證碼到您的信箱，請輸入驗證碼和新密碼')}
            </Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                id="code"
                label={t('驗證碼')}
                name="code"
                value={code}
                onChange={handleCodeChange}
                autoFocus
              />
              <PasswordAndCheck setPassword={setPassword} setConfirmPassword={setConfirmPassword}/>
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {t('重設密碼')}
              </Button>
              <Grid container>
                
                
              </Grid>
              {/* <Copyright sx={{ mt: 5 }} /> */}
            </Box>
            : 
            // forgetpwdStatus === 1
            <Box component="form" noValidate sx={{ mt: 4,  width: '100%' }} onSubmit={handleSubmit}>
            <Typography variant="body2">
            {t('輸入你註冊會員的電子信箱')}
            </Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label={t('電子郵件')}
                name="email"
                autoComplete="email"
                value={email}
                onChange={handleEmailChange}
                autoFocus
              />
              
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {t('重設密碼')}
              </Button></Box>}
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
      {loading && <Loading/>}
    </ThemeProvider>
  );
}
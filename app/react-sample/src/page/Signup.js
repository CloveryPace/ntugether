import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
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
import { API_EMAIL_VERIFY, API_SIGN_UP, API_GOOGLE_SIGNUP, API_GET_USER } from '../global/constants';
import axios from 'axios';
import { MuiOtpInput } from 'mui-one-time-password-input'
import theme from '../components/Theme'; 
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import {setAuthToken, setUserIdToCookie} from '../utils';
import Loading from '../components/Loading';
import PasswordAndCheck from '../components/PasswordAndCheck';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import { useEffect } from 'react';

const { useState } = React;

export default function Signup() {
  const { t, i18n } = useTranslation();

  const [signupStatus, setSignupStatus] = useState(1); // 1: signup form, 2: signup otp, 3: signup success
  const [signupErrorMsg, setSignupErrorMsg] = useState(); 

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState(dayjs('2022-04-17'));
  const [username, setUserName] = useState('');

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [ user, setUser ] = useState([]);
  const [ profile, setProfile ] = useState([]);

  let data = new FormData();

  const sociallogin = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log('Login Failed:', error)
  });

  const handleFirstSignupSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    if(password !== confirmPassword || password === '' || confirmPassword === ''){
      setError(true);
      console.log('error');
    }else{
      setError(false);
    }

    data = new FormData(event.currentTarget);

    if (Boolean(error)) {
      alert(error);
    }else{
    
      axios.get(API_EMAIL_VERIFY, {params:{ 
        email: data.get('email'),
      }}, {
        headers: {
          'Access-Control-Allow-Origin': true
        }
      })
      .then(function (response) {
        console.log(response);
        setSignupStatus(2);
        setLoading(false);
        setSignupErrorMsg('');
      })
      .catch(function (error) {
        console.log(error);
        if(error.response.status == 409){
          setSignupErrorMsg(t('此信箱已被註冊'));
        }else{
          setSignupErrorMsg(t('註冊失敗，請再試一次'));
        }
        setLoading(false);
      });
    }
  }

  const [otp, setOtp] = useState('');

  const handleOTPChange = (newValue) => {
    setOtp(newValue)
  }
  const handleComplete = (value) => {
    setLoading(true);

    axios.post(API_SIGN_UP, { 
      name: username,
      email: email,
      birthday: birthday,
      gender: gender,
      password: password
    
    })
    .then(function (response) {
      signupErrorMsg('');
      setLoading(false);
      setSignupStatus(3);
      setAuthToken(response.data.jwtToken);
      getUserInfo(response.data.jwtToken);
    })
    .catch(function (error) {
      setLoading(false);
      if(error.response.status == 409){
        setSignupErrorMsg(t('此信箱已被註冊'));
      }else if(error.response.status == 401){
        setSignupErrorMsg(t('驗證碼錯誤，請再試一次'));
      }else{
        setSignupErrorMsg(t('註冊失敗，請再試一次'));
      }
    });
  }

  const getUserInfo = (token) => {
    axios.get(API_GET_USER, { 
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(function (response) {
      setUserIdToCookie(response.data.members.user_id.toString());
      window.location.assign('/');
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  const oauthSignup = (userData) => {
    axios.post(API_GOOGLE_SIGNUP, {
        email: userData.email,
        name: userData.name,
        oauthProvider: "Google",
        oauthId: userData.id
    }).then(function (response) {
        setAuthToken(response.data.token);
        window.location.assign('/');
    }).catch(function (error) {
        console.log(error);
    });
  }

  useEffect(
    () => {
        if (user) {
            axios
                .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                    headers: {
                        Authorization: `Bearer ${user.access_token}`,
                        Accept: 'application/json'
                    }
                })
                .then((res) => {
                    setProfile(res.data);
                    oauthSignup(res.data);
                })
                .catch((err) => console.log(err));
        }
    },
    [ user ]
);


  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  
  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
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
            {t('註冊')}
          </Typography>
          {
                signupErrorMsg ?

                <Box>
                    <Typography component="body1" variant="body1">
                    {signupErrorMsg}</Typography>
                    </Box>: null
              }
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
                  label={t('姓名')} 
                  autoFocus
                  value={username}
                  onChange={handleUserNameChange} 
                />
              </Grid>
              
              
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label={t('電子郵件')}
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
                    label={t('生日')}
                    name="birthday"
                    id="birthday"
                    value={birthday}
                    onChange={(newValue) => setBirthday(newValue)}
                    />
                </LocalizationProvider>

      
              </Grid>        
                

              <Grid item xs={12}>
                <FormControl fullWidth>

                  <InputLabel id="label_gender">{t('性別')}</InputLabel>
                  <Select
                    labelId="label_gender"
                    id="gender"
                    name="gender"
                    value={gender}
                    label="Gender"
                    onChange={handleGenderChange}
                    fullWidth
                  >
                    <MenuItem value={1}>{t('男性')}</MenuItem>
                    <MenuItem value={2}>{t('女性')}</MenuItem>
                  </Select>
                  </FormControl>

              </Grid>
              <Grid item xs={12}>
              <PasswordAndCheck setPassword={setPassword} setConfirmPassword={setConfirmPassword}/>
              </Grid>
              <Grid item xs={12}>
              <Divider sx={{mt: 2, mb: 2}}>{t('或者')}</Divider>
              </Grid>
              <Grid item xs={12}>
              <Button onClick={() => sociallogin()} variant="outlined" fullWidth sx={{color: 'rgba(0, 0, 0, 0.87)'}} size="large"> <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" style={{width: '18px', height: '18px', marginRight: '5px'}} />{t('使用 Google 帳戶註冊')}</Button>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {t('註冊')}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href={'/login'} variant="body2">
                  {t('已經有帳號了嗎？登入')}
                </Link>
              </Grid>
            </Grid>
            </Box> : null
          }
              {
                signupStatus == 2? 
                <MuiOtpInput value={otp} onChange={handleOTPChange} onComplete={handleComplete} length={6}
                style={{marginTop:20}} />:
                null
              }
              {
                !signupErrorMsg  && signupStatus == 3? 
                <Box>
                <Typography component="body" variant="body1">
                  {t('註冊成功，將在 5 秒後跳轉至登入頁面')}</Typography>
                  <Typography component="body" variant="body1">
                  {t('或是直接前往')}<Link href={'/'}>{t('首頁')}</Link></Typography></Box> : 
                  null
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
      {loading && <Loading/>}
    </ThemeProvider>
  );
}

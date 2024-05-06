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
import { API_EMAIL_VERIFY, API_SIGN_UP, API_GOOGLE_SIGNUP } from '../global/constants';
import axios from 'axios';
import { MuiOtpInput } from 'mui-one-time-password-input'
import theme from '../components/Theme'; 
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import {setAuthToken} from '../utils';

const atLeastMinimumLength = (password) => new RegExp(/(?=.{8,})/).test(password);
const atLeastOneUppercaseLetter = (password) => new RegExp(/(?=.*?[A-Z])/).test(password);
const atLeastOneLowercaseLetter = (password) => new RegExp(/(?=.*?[a-z])/).test(password);
const atLeastOneNumber = (password) => new RegExp(/(?=.*?[0-9])/).test(password);
const atLeastOneSpecialChar = (password) => new RegExp(/(?=.*?[#?!@$ %^&*-])/).test(password);

const PasswordStrength = {  
  WEAK: '弱',
  MEDIUM: '中',
  STRONG: '強'
};

function testingpasswordStrength(password){
    if (!password) return PasswordStrength.WEAK;
    let points = 0;
    if (atLeastMinimumLength(password)) points += 1;
    if (atLeastOneUppercaseLetter(password)) points += 1;
    if (atLeastOneLowercaseLetter(password)) points += 1;
    if (atLeastOneNumber(password)) points += 1;
    if (atLeastOneSpecialChar(password)) points += 1;
    if (points >= 5) return PasswordStrength.STRONG;
    if (points >= 3) return PasswordStrength.MEDIUM;
    return PasswordStrength.WEAK;
}

function generateColors(strength) {
    let result = [];
    const COLORS = {
      NEUTRAL: 'hsla(0, 0%, 88%, 1)',
      WEAK : 'hsla(353, 100%, 38%, 1)',
      MEDIUM: 'hsla(40, 71%, 51%, 1)',
      STRONG : 'hsla(134, 73%, 30%, 1)'
    };
    switch (strength) {
      case PasswordStrength.WEAK:
      result = [COLORS.WEAK, COLORS.NEUTRAL, COLORS.NEUTRAL, COLORS.NEUTRAL];
      break;
      case PasswordStrength.MEDIUM:
      result = [COLORS .MEDIUM, COLORS.MEDIUM, COLORS.NEUTRAL, COLORS.NEUTRAL];
      break;
      case PasswordStrength.STRONG:
      result = [ COLORS .STRONG, COLORS.STRONG, COLORS.STRONG, COLORS.STRONG];
      break;
    }
    return result;
}
// TODO remove, this demo shouldn't need to reset the theme.

const { useState } = React;

export default function Signup() {
  const { t, i18n } = useTranslation();

  const [signupStatus, setSignupStatus] = useState(1); // 1: signup form, 2: signup otp, 3: signup success
  const [signupSuccess, setSignupSuccess] = useState(); 

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState(dayjs('2022-04-17'));
  const [username, setUserName] = useState('');

  const [error, setError] = useState('');

  let data = new FormData();

  const handleFirstSignupSubmit = (event) => {
    event.preventDefault();

    if(password !== confirmPassword || testingpasswordStrength(password) !== PasswordStrength.STRONG){
      setError(true);
      console.log('error');
    }else{
      setError(false);
    }

    data = new FormData(event.currentTarget);

    //todo: validate form
    if (error) {
      alert(error);
    }else{
    
      axios.get(API_EMAIL_VERIFY, {params:{ 
        // name: data.get('name'),
        email: data.get('email'),
        // password: data.get('password'),
        // gender: data.get('gender'),
        // birthday: data.get('birthday')
      }}, {
        headers: {
          'Access-Control-Allow-Origin': true
        }
      })
      .then(function (response) {
        console.log(response);
        setSignupStatus(2);

      })
      .catch(function (error) {
        console.log(error);
        setSignupSuccess(false);
      });
    }
  }

  const [otp, setOtp] = useState('');

  const handleOTPChange = (newValue) => {
    setOtp(newValue)
  }
  const handleComplete = (value) => {
    console.log(value);
    console.log(data);
    axios.post(API_SIGN_UP, { 
      name: username,
      password: password,
      gender: gender,
      birthday: birthday,
      code: value,
      email: email
    
    })
    .then(function (response) {
      console.log(response);
      setSignupSuccess(true);
      setTimeout(function() {
        window.location.assign('/');
      }, 5000);
      setAuthToken(response.data.jwtToken);
    })
    .catch(function (error) {
      console.log(error);
      setSignupSuccess(false);
    });
  }

  const googleLogin = () => {
    axios.get(API_GOOGLE_SIGNUP, {
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
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

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
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
                  
                <TextField
                  required
                  fullWidth
                  name="password"
                  label={t('密碼')}
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={handlePasswordChange}
                />
                <CheckPasswordStrength password={password}/>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="comfirmPassword"
                  label={t('再次輸入密碼')}
                  type="password"
                  id="confirm-password"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  color={password === confirmPassword ? 'primary' : 'warning'}
                />
                {password === confirmPassword ? null : <Box><Typography variant="subtitle2" fontSize="14px" fontWeight={500} color="text.bodyLight"
          margin="6px 0 24px 0px">{t('請輸入相同的密碼')}</Typography></Box>}
              </Grid>
              <Grid item xs={12}>
              <Divider sx={{mt: 2, mb: 2}}>{t('或者')}</Divider>
              </Grid>
              <Grid item xs={12}>
              <Button onClick={googleLogin} variant="outlined" fullWidth sx={{color: 'rgba(0, 0, 0, 0.87)'}} size="large"> <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" style={{width: '18px', height: '18px', marginRight: '5px'}} />{t('使用 Google 帳戶註冊')}</Button>
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
                signupSuccess == true && signupStatus == 3? 
                <Box>
                <Typography component="body" variant="body1">
                  {t('註冊成功，將在 5 秒後跳轉至登入頁面')}</Typography>
                  <Typography component="body" variant="body1">
                  {t('或是直接前往')}<Link href={'/'}>{t('首頁')}</Link></Typography></Box> : 
                  null
              }
              {
                signupSuccess == false && signupStatus == 2? 

                <Box>
                    <Typography component="body1" variant="body1">
                  註冊失敗，請再試一次</Typography>
                    </Box>: null
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


function CheckPasswordStrength({password}){
  const { t, i18n } = useTranslation();

  const passwordStrength = testingpasswordStrength(password);
  const colors = generateColors(passwordStrength);

  return(
  <Box>
      <Box display="flex" alignItems="center" justifyContent="center" gap="5px" margin="10px 0">
      {colors.map((color, index) => (
        <Box key={index} flex={1} height="5px" borderRadius="5px" bgcolor={color}></Box>
      ))}
      </Box>
      <Box display="flex" alignItems="center" justifyContent="flex-start" gap="5px" margin="0 0 15px">
        <Typography color={colors[0]}>{t(passwordStrength)}</Typography>
        </Box>
        {passwordStrength !== PasswordStrength.STRONG && (
          <Typography variant="subtitle2" fontSize="14px" fontWeight={500} color="text.bodyLight"
          margin="0 0 24px 0px">
            {t('密碼需包含至少 8 個字元，包含至少一個大寫字母、小寫字母、數字、特殊字元')}
          </Typography>)
        }
  </Box>
  

      );
    }
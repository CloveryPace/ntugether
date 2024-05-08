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

// TODO remove, this demo shouldn't need to reset the theme.
const { useState } = React;

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

export default function ForgetPassword() {
  const { t, i18n } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');

  const [confirmPassword, setConfirmPassword] = useState('');
  const [forgetpwdStatus, setForgetpwdStatus] = useState(1);  // 1: initial, 2: success
  const [error, setError] = useState('');


  const handleSubmit = (event) => {
    event.preventDefault();
    
    axios.get(API_FORGET_PASSWORD, {params:{ 
        email: email,
      
      }})
      .then(function (response) {
        console.log(response);
        setForgetpwdStatus(2);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleChangeSubmit = (event) => {
    event.preventDefault();

    if(password !== confirmPassword || testingpasswordStrength(password) !== PasswordStrength.STRONG){
      setError(true);
      console.log('error');
    }else{
      setError(false);
    }

    if (error) {
      alert(error);
    }else{
    axios.post(API_RESET_PASSWORD, { 
        email: email,
        code: code,
        newPassword: password
      })
      .then(function (response) {
        console.log(response);
        window.location.assign('/login');
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }


  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
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
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
import theme from '../components/Theme'; 
import { API_LOGIN } from '../global/constants';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import Divider from '@mui/material/Divider';
import { setAuthToken } from "../utils";

// TODO remove, this demo shouldn't need to reset the theme.

export default function Login() {
  const { t, i18n } = useTranslation();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    axios.post(API_LOGIN, { 
        email: data.get('email'),
        password: data.get('password')
      
      })
      .then(function (response) {
        console.log(response);
        setAuthToken(response.data.jwtToken);
        window.location.assign('/');
      })
      .catch(function (error) {
        console.log(error);
      });
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
              {t('登入')}
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 ,width: '100%'}}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label={t('電子郵件')}
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label={t('密碼')}
                type="password"
                id="password"
                autoComplete="current-password"
              />
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              <Divider sx={{mt: 2, mb: 2}}>{t('或者')}</Divider>
              <Button variant="outlined" fullWidth sx={{color: 'rgba(0, 0, 0, 0.87)'}} size="large"> <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" style={{width: '18px', height: '18px', marginRight: '5px'}} />{t('使用 Google 帳戶登入')}</Button>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {t('登入')}
              </Button>
              <Grid container>
                <Grid item xs={12} md={6}>
                  <Link href={'./forgetPassword'} variant="body2">
                  {t('忘記密碼？')}
                  </Link>
                </Grid>
                <Grid item xs={12} md={6} sx={{textAlign: {md:'end', sx:'start'}}}>
                  <Link href={'/signup'} variant="body2">
                  {t("還沒有帳號？註冊")}
                  </Link>
                </Grid>
              </Grid>
              {/* <Copyright sx={{ mt: 5 }} /> */}
            </Box>
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

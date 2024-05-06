import HeaderBar from '../components/HeaderBar';
import './Common.css';

import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { cyan, yellow, orange } from '@mui/material/colors';
import { Grid } from "@material-ui/core";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import React from 'react';
import { styled } from '@mui/material/styles';
import UserPageNav from '../components/UserPageNav';
import theme from '../components/Theme'; 
import './Common.css';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { API_GET_USER } from '../global/constants';
import { getAuthToken } from '../utils';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

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
  const { t, i18n } = useTranslation();
  const [userToken, setUserToken] = useState(getAuthToken());

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [tag, setTag] = useState('');
  const [about, setAbout] = useState('');


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    axios.put(API_GET_USER, {
      name: name,
      phoneNum: phone,
      gender: gender,
      aboutMe: about
    }, {headers:{
      authorization: 'bearer ' + userToken
    }}).then(function (response) {
      alert('修改成功');
      console.log(response);
    }).catch(function (error) {
      console.log(error);
    })
  };

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = () => {
    axios.get(API_GET_USER, {headers:{ 
      authorization: 'bearer ' + userToken
    
    }})
    .then(function (response) {
      console.log(response.data.members);
        setName(response.data.members.name? response.data.members.name : '');
        setEmail(response.data.members.email);
        setPhone(response.data.members.phoneNum? response.data.members.phoneNum : '');
        setGender(response.data.members.gender? response.data.members.gender : '');
        setTag(response.data.members.tag? response.data.members.tag : '');
        setAbout(response.data.members.self_introduction? response.data.members.self_introduction : '');
        
    })
    .catch(function (error) {
      console.log(error);
    });
  
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };



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
                                label={t('姓名')}
                                value={name}
                                onChange={(event) => {
                                setName(event.target.value);
                                }}
                            />
                        <TextField
                                margin="normal"
                                fullWidth
                                label={t('電子郵件')}
                                value={email}
                                onChange={(event) => {
                                setEmail(event.target.value);
                                }}
                            />
                        <TextField
                                fullWidth
                                margin="normal"
                                label={t('手機號碼')}
                                value={phone}
                                onChange={(event) => {
                                setPhone(event.target.value);
                                }}
                            />
                        
                            <FormControl fullWidth margin="normal">

                              <InputLabel id="label_gender">{t('性別')}</InputLabel>
                              <Select
                                labelId="label_gender"
                                id="gender"
                                name="gender"
                                value={gender}
                                label="Gender"
                                onChange={handleGenderChange}
                                
                              >
                                <MenuItem value={1}>{t('男性')}</MenuItem>
                                <MenuItem value={2}>{t('女性')}</MenuItem>
                              </Select>
                              </FormControl>

                        <TextField
                                fullWidth
                                margin="normal"
                                id="outlined-multiline-static"
                                label={t('關於我')}
                                multiline
                                rows={4}
                                defaultValue="Default Value"
                                value={about}
                                onChange={(event) => {
                                  setAbout(event.target.value);
                                }}
                                />
                        {/* <TextField
                                fullWidth
                                margin="normal"
                                label="Tag"
                                value={tag}
                                onChange={(event) => {
                                setTag(event.target.value);
                                }}
                            /> */}
                            {/* 暫時隱藏 */}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {t('修改')}
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
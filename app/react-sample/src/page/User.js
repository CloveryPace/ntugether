import HeaderBar from '../components/HeaderBar';
import './Common.css';

import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Divider, Grid, Paper } from "@material-ui/core";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React from 'react';
import theme from '../components/Theme'; 
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useTranslation } from 'react-i18next';
import queryString from "query-string";
import { getAuthToken, getUserId } from '../utils';
import { useEffect } from 'react';
import { API_GET_USER, API_CREATE_ACTIVITY, API_CREATE_PLAN } from '../global/constants';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Link from '@mui/material/Link';
import ActivityComponent from '../components/ActivityComponent';
import PlanComponent from '../components/PlanComponent';

const { useState } = React;
const parsed = queryString.parse(window.location.search);

  function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }
  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
// 頭像顏色根據名字變化
function stringToColor(string) {
  let hash = 0;
  let i;
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
}
function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
      width: {md:128, xs:64}, 
      height: {md:128, xs:64} 
    },
    children: `${name[0]}`,
  };
}
function User() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [tag, setTag] = useState('');
  const [about, setAbout] = useState('');
  const [myself, setMyself] = useState(false);
  const [following, setFollowing] = useState(false);
  const [followingNumber, setFollowingNumber] = useState(0);
  const [activityNumber, setActivityNumber] = useState(0);
  const [progressNumber, setProgressNumber] = useState(0);

  const [activity, setActivity] = React.useState([]);
  const [progress, setProgress] = React.useState([]);

  const authtoken = getAuthToken();
  const userId = getUserId();
  const navigate = useNavigate();

  useEffect(() => {
    getUserData();
    getUserStatisticalData();
    if(userId == parsed.id){
      setMyself(true);
    }else{
      getFollowList();
    }
  }, []);

  const getUserData = () => {
    axios.get(API_GET_USER, {
      headers: { 
        authorization: 'Bearer ' + authtoken
    },
      params: {user_id: parsed.id}
    })
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

  const getFollowList = () => {
    axios.get(API_GET_USER + '/' + userId + '/following' , {headers: { 
      authorization: 'Bearer ' + authtoken
    }})
    .then(function (response) {
      let followingIds = [];
      response.data.map((user) => {
        followingIds.push(user.followingId.toString());
      });
      beenFollowed(followingIds, parsed.id);
    })
    .catch(function (error) { 
      console.log(error);
    });
  }

  const getUserStatisticalData = () => {
    axios.get(API_GET_USER + '/' + parsed.id +'/following', {headers: { 
      authorization: 'Bearer ' + authtoken
    }})
    .then(function (response) {
      console.log('追蹤人數');
      console.log(response.data);
      setFollowingNumber(response.data.length);
    })
    .catch(function (error) {
      console.log(error);
    });
    
    axios.get(API_CREATE_ACTIVITY + `?target_user=${parsed.id}&mode=owned`, {headers: { 
      authorization: 'Bearer ' + authtoken
    }})
    .then(function (response) {
      console.log('發起活動');
      console.log(response.data);
      setActivityNumber(response.data.length);
      setActivity(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });

    axios.get(API_CREATE_PLAN + `?target_user=${parsed.id}&mode=owned`, {headers: { 
      authorization: 'Bearer ' + authtoken
    }})
    .then(function (response) {
      console.log('發起進度');
      console.log(response.data);
      setProgressNumber(response.data.length);
      setProgress(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  

  const beenFollowed = (followingIds, id) => {
    if (followingIds.includes(id.toString())) {
      setFollowing(true);
    }
  }

  const unfollow = (event) => {
    event.preventDefault();
    axios.post(API_GET_USER + '/' + parsed.id + '/unfollow/', {},{headers: { 
      authorization: 'Bearer ' + authtoken
    }}).then(function (response) {
      alert('取消追蹤成功');
      setFollowing(false);
    }).catch(function (error) {
      console.log(error);
    })
  }

  const follow = (event) => {
    event.preventDefault();
    axios.post(API_GET_USER + '/' + parsed.id + '/follow/', {},{headers: { 
      authorization: 'Bearer ' + authtoken
    }}).then(function (response) {
      alert('追蹤成功');
      setFollowing(true);
    }).catch(function (error) {
      console.log(error);
    })
  }


  const [value, setValue] = React.useState(0);
  const { t, i18n } = useTranslation();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <ThemeProvider theme={theme}>
    <HeaderBar />
    <Box sx={{p: {md:"2rem 10rem 10rem 10rem", xs:"20px 10px"}}}>
        <CssBaseline />
        <Stack spacing={2}>
          <Box>
            <Grid container spacing={2}>
              <Grid item md={2} xs={3}>
              <Avatar
                
                {...stringAvatar(name?name: "Unknown")}
                />
                </Grid>
                <Grid item md={6} xs={3}>
                <Typography variant="h4"> {name} </Typography>
                </Grid>

                <Grid item md={4} xs={6}>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                <Stack spacing={2} sx={{textAlign: 'center'}} >
                  <Typography variant="body1"> {t('追蹤人數')} </Typography>
                  <Typography variant="body1"> {followingNumber} </Typography>
                </Stack>
                </Grid>
                <Grid item xs={4}>
                <Stack spacing={2} sx={{textAlign: 'center'}}>
                  <Typography variant="body1"> {t('活動發起')} </Typography>
                  <Typography variant="body1"> {activityNumber} </Typography>
                </Stack>
                </Grid>
                <Grid item xs={4}>
                <Stack spacing={2} sx={{textAlign: 'center'}}>
                  <Typography variant="body1"> {t('進度發起')} </Typography>
                  <Typography variant="body1"> {progressNumber} </Typography>
                </Stack>
                </Grid>
                </Grid>
                <Stack direction="row" spacing={2} sx={{mt:1}}>
                    {following && !myself && <Button variant="outlined" fullWidth onClick={unfollow}>{t('追蹤中，取消追蹤')}</Button> }
                    {!following && !myself && <Button variant="contained" fullWidth onClick={follow}>{t('追蹤')}</Button>}
                    { myself && <Button variant="outlined" fullWidth onClick={() => navigate('/userprofile')}>{t('編輯個人資料')}</Button>}
    
                </Stack>
                </Grid>
              </Grid>
          </Box>
          <Box sx={{ width: '100%' , margin: 4}}>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="secondary"
              textColor="inherit"
              variant="fullWidth"
              aria-label="full width tabs example"
            >
              <Tab label={t("關於")} {...a11yProps(0)} />
              <Tab label={t("活動發起紀錄")} {...a11yProps(1)} />
              <Tab label={t("進度發起紀錄")} {...a11yProps(2)} />
            </Tabs>
            <CustomTabPanel value={value} index={0}>
            {/* <Stack direction="row" spacing={1}>
                <Chip color="secondary" label={"健身"}/>
                <Chip color="secondary" label={"英文交流"}/>
              </Stack > */}
              <Typography variant='h5'>{t('簡介')}</Typography>
              <Typography variant='body1'>{about ? about: t('目前尚無簡介')}</Typography>
              
              <Divider />
              <Typography variant='h5'>{t('聯絡方式')}</Typography>
              <Typography variant='body1'>{email ? email: t('目前無聯絡方式')}</Typography>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
            <Grid container spacing={2}>
                    
                    { 
                    activity.length !== 0?
                    (activity.map((activity) => {
                       return (
                         <ActivityComponent data={activity} key={activity.id} />
                       );
                     })): <Typography variant="h4">{t('尚無活動紀錄')}</Typography>

                   }
         
               </Grid>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                <Grid container spacing={2}>

                  {
                    progress.length !== 0?
                    (progress.map((plan) => {
                      return(
                      <PlanComponent data={plan} key={plan.id} />
                      )
                    })): <Typography variant="h4">{t('尚無計畫紀錄')}</Typography>
                  }
                </Grid>
            </CustomTabPanel>
          </Box>
          <Box>
          
          
          </Box>
        </Stack>
    
    </Box>
    </ThemeProvider>
  );
}

export default User;
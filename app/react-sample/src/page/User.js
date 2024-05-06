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
import theme from '../components/Theme'; 
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
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

function User() {
  const style = { 
    padding: {sx:"10px",md:"2rem 10rem 10rem 10rem"}
  };
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


  const [value, setValue] = React.useState(0);

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
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
                sx={{ width: {md:128, xs:64}, height: {md:128, xs:64} }}
                />
                </Grid>
                <Grid item md={6} xs={3}>
                <Typography variant="h4"> Name </Typography>
                </Grid>

                <Grid item md={4} xs={6}>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                <Stack spacing={2} sx={{textAlign: 'center'}} >
                  <Typography variant="body1"> 追蹤人數 </Typography>
                  <Typography variant="body1"> 100 </Typography>
                </Stack>
                </Grid>
                <Grid item xs={4}>
                <Stack spacing={2} sx={{textAlign: 'center'}}>
                  <Typography variant="body1"> 活動發起 </Typography>
                  <Typography variant="body1"> 100 </Typography>
                </Stack>
                </Grid>
                <Grid item xs={4}>
                <Stack spacing={2} sx={{textAlign: 'center'}}>
                  <Typography variant="body1"> 進度發起 </Typography>
                  <Typography variant="body1"> 100 </Typography>
                </Stack>
                </Grid>
                </Grid>
                <Stack direction="row" spacing={2} sx={{mt:1}}>
                  <Button variant="contained" fullWidth>追蹤</Button>

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
              <Tab label="關於" {...a11yProps(0)} />
              <Tab label="活動發起紀錄" {...a11yProps(1)} />
              <Tab label="進度發起紀錄" {...a11yProps(2)} />
            </Tabs>
            <CustomTabPanel value={value} index={0}>
            <Stack direction="row" spacing={1}>
                <Chip color="secondary" label={"健身"}/>
                <Chip color="secondary" label={"英文交流"}/>
              </Stack >
              <Typography variant='h5'>簡介</Typography>
              <Typography variant='body1'>簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介</Typography>
              
              <Divider />
              <Typography variant='h5'>聯絡方式</Typography>
              <Typography variant='body1'>簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介</Typography>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              尚無活動紀錄
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              尚無進度紀錄
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
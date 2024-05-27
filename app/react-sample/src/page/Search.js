import './Common.css';
import HeaderBar from '../components/HeaderBar';
// import MainInform from '../components/MainInform';
// import TextButtons from '../components/TextButtons';
// import ActivityListComponent from '../components/ActivityListComponent';
// import PlanListComponent from '../components/PlanListComponent';
import Footer from '../components/Footer';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { ThemeProvider } from '@mui/material/styles';
import { Typography} from '@mui/material';
import theme from '../components/Theme'; 
import { useTranslation } from 'react-i18next';
import TextButtonsPlan from '../components/TextButtonsPlan';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { API_CREATE_ACTIVITY, API_CREATE_PLAN } from '../global/constants';
import React from 'react';
import axios from 'axios';
import ActivityComponent from '../components/ActivityComponent';
import PlanComponent from '../components/PlanComponent';
import { getAuthToken } from '../utils';
import { Grid } from '@mui/material';

const { useState } = React;


function Search(props) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { filterData, searchValue } = useLocation().state;

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [type, setType] = useState('');
  const [isActivity, setIsActivity] = useState();
  const [isProgress, setIsProgress] = useState();

  const [activityData, setActivityData] = useState([]);
  const [progressData, setProgressData] = useState([]);
  const [userToken, setUserToken] = useState(getAuthToken());

  const processFilterData = (filterData) => {
    // filterData['category'] = filterData['category'].split(',');
    // filterData['location'] = filterData['location'].split(',');
    // filterData['time'] = filterData['time'].split(',');
    // filterData['type'] = filterData['type'].split(',');

  
    if(Object.keys(filterData).length !== 0 && filterData.constructor === Object){
        if(filterData['type'].length > 0 && filterData['type'].includes('活動')){
            setIsActivity(true);
        }else if(filterData['type'].length > 0 && filterData['type'].includes('進度計畫')){
            setIsProgress(true);
        }else if(filterData['type'].length === 0){
            setIsActivity(true);
            setIsProgress(true);
        }
    }else if(Object.keys(filterData).length === 0 && filterData.constructor === Object){
        setIsActivity(true);
        setIsProgress(true);
        console.log(isActivity)
        console.log('no filter data')
    }

    console.log(isActivity)

    if(isActivity){
        searchActivity();
    }
    if(isProgress){
        searchProgress();
    }
    
  }

  const config = {
    headers: { 
      authorization: `Bearer ${userToken}`
    }
  };

  const searchActivity = () => { 
    console.log('activity progress')
    axios.get(`${API_CREATE_ACTIVITY}?search=${searchValue}`, config)
    .then((response) => {
        console.log(response.data);
        setActivityData(response.data);
    }).catch((err) => {
        console.log(err)
    });
  }

  const searchProgress = () => {
        console.log('search progress')
        axios.get(`${API_CREATE_PLAN}?search=${searchValue}`, config)
        .then((response) => {
            console.log(response.data);
            setProgressData(response.data);
        }).catch((err) => {
            console.log(err)
        });
    }

  useEffect(
    () => {
        console.log(filterData)
        processFilterData(filterData);
    },
    [isActivity, isProgress]
    );

  return (
    <ThemeProvider theme={theme}>
        
        <HeaderBar />
        <div className='Main'>
            
          <Stack direction="row" justifyContent="space-between" spacing={2} sx={{mt: 2, mb: 2}}>
            <Typography variant="h3">{t('搜尋結果')}</Typography>
         </Stack>
         {
            isActivity && activityData.length === 0 && <Typography variant="h4">{t('無活動結果')}</Typography>
         }
         {
            isActivity && activityData.length > 0?<Stack direction="row" justifyContent="space-between" spacing={2} sx={{mt: 2, mb: 2}}>
            <Typography variant="h4">{t('熱門活動')}</Typography></Stack>: null
         }
          <Grid container spacing={2}>
          { (activityData.map((activity) => {
              return (
                <ActivityComponent data={activity} key={activity.id} />
              );
            }))
          }
            </Grid>
          
            {
                isProgress && progressData.length === 0 && <Typography variant="h4">{t('無計畫結果')}</Typography>
            }
            {
                isProgress && progressData.length > 0?<Stack direction="row" justifyContent="space-between" spacing={2} sx={{mt: 2, mb: 2}}>
                <Typography variant="h4">{t('熱門計畫')}</Typography></Stack>: null
            }

          <Grid container spacing={2}>

            {progressData.map((plan) => (
            <PlanComponent data={plan} key={plan.id} />
            ))}
          </Grid>
          
        </div>

        <Footer />
      

      </ThemeProvider>
  );
}

export default Search;
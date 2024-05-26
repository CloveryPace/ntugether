import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import { Grid, Typography, Divider } from '@mui/material';
import AttendedPlanListComponent from '../components/AttendedPlanListComponent';
import { API_CREATE_PLAN } from '../global/constants'; // replace with your actual API endpoint
import { getAuthToken } from '../utils';

import { ThemeProvider } from '@mui/material/styles';
import theme from '../components/Theme'; 
import HeaderBar from '../components/HeaderBar';
import './Common.css';
import UserPageNav from '../components/UserPageNav';
import { useTranslation } from 'react-i18next';

const PlanManage = () => {
  const { t } = useTranslation();
  const [plans, setPlans] = useState({
    ongoingJoined: [],
    completedJoined: [],
    ongoingOwned: [],
    completedOwned: []
  });

  useEffect(() => {
    fetchPlans('joined');
    fetchPlans('owned');
  }, []);

  const [userToken, setUserToken] = useState(getAuthToken());

  const fetchPlans = async (mode) => {
    try {
      const token = userToken; // Make sure to define userToken appropriately
      const config = {
        headers: {
          authorization: `Bearer ${token}`
        },
        params: {
          mode: mode
        }
      };
      const today = new Date().toISOString().split('T')[0];

      const response = await axios.get(API_CREATE_PLAN, config);
      const data = response.data;

      console.log("---");
      console.log(data);

      const ongoingPlans = [];
      const completedPlans = [];

      data.forEach(plan => {
        if (plan.end_date >= today) {
          ongoingPlans.push(plan);
        } else {
          completedPlans.push(plan);
        }
      });

      if (mode === 'joined') {
        setPlans(prevPlans => ({
          ...prevPlans,
          ongoingJoined: ongoingPlans,
          completedJoined: completedPlans
        }));
      } else if (mode === 'owned') {
        setPlans(prevPlans => ({
          ...prevPlans,
          ongoingOwned: ongoingPlans,
          completedOwned: completedPlans
        }));
      }
    } catch (error) {
      console.error('Error fetching plans:', error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <HeaderBar />
      <UserPageNav selectedTab={2}/> 
      <div className='Main'>
        <Typography variant="h5">{t('參與紀錄')}</Typography>
        <Typography variant="h6">{t('進行中')}</Typography>
        <AttendedPlanListComponent plans={plans.ongoingJoined} />
        <br/>
        <br/>
        <Typography variant="h6">{t('已結束')}</Typography>
        <AttendedPlanListComponent plans={plans.completedJoined} />
        <br/>
        <br/>
        <Divider />
        <br/>
        <br/>
        <Typography variant="h5">{t('發起紀錄')}</Typography>
        <Typography variant="h6">{t('進行中')}</Typography>
        <AttendedPlanListComponent plans={plans.ongoingOwned} />
        <br/>
        <br/>
        <Typography variant="h6">{t('已結束')}</Typography>
        <AttendedPlanListComponent plans={plans.completedOwned} />
      </div>
    </ThemeProvider>  
  );
}

export default PlanManage;

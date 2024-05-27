import React, { useState } from 'react';
import { List, Typography, Button } from '@mui/material';
import PlanAchieveItem from './PlanAchieveItem';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import { useEffect } from 'react';
import { getAuthToken } from '../utils'; // 自定義的 token 獲取函數
import { API_CREATE_PLAN } from '../global/constants'; // API 常數

export default function PlanAchieveList() {

  const { t } = useTranslation();

  const initialDisplayCount = 2;
  const incrementCount = 2;
  const [displayCount, setDisplayCount] = useState(initialDisplayCount);

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

  const handleShowMore = () => {
    setDisplayCount(prevDisplayCount => prevDisplayCount + incrementCount);
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
      {t('計畫達成比例')}
      </Typography>
      <List>

        {plans.ongoingJoined.length === 0 ? (
          <Grid item xs={12}><Typography>{t('沒有計畫')}</Typography></Grid>
        ) : (
          plans.ongoingJoined.slice(0, displayCount).map(plan => (
              <PlanAchieveItem planId={plan.plan_id} planName={plan.name} />
          ))
        )}

      </List>
      {displayCount < plans.ongoingJoined.length && (
        <Button onClick={handleShowMore}>
          <Typography>{t('查看更多')}</Typography>
        </Button>
      )}
    </div>
  );
}

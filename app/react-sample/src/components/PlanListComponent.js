import React, { useState, useEffect } from 'react';
import PlanComponent from './PlanComponent';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import { API_CREATE_PLAN } from '../global/constants';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { getAuthToken } from '../utils';

export default function PlanListComponent() {
  const [data, setData] = useState([]);
  const [userToken, setUserToken] = useState(getAuthToken());
  const [visibleItems, setVisibleItems] = useState(6);
  const { t } = useTranslation();

  useEffect(() => {
    const config = {
      headers: { 
        authorization: `Bearer ${userToken}`
      }
    };

    //取得計畫列表
    axios.get(API_CREATE_PLAN, config)
      .then(function (res) {
        const today = new Date().toISOString().split('T')[0];
        const futurePlans = res.data.filter(plan => plan.end_date >= today);
        setData(futurePlans);
      })
      .catch(function (err) {
        console.log(err);
        alert("error");
      });
  }, [userToken]);

  const handleLoadMore = () => {
    setVisibleItems(prevVisibleItems => prevVisibleItems + 6);
  };

  return (
    <div>
      <Grid container spacing={2}>
        {data.slice(0, visibleItems).map((plan) => (
          <PlanComponent data={plan} key={plan.id} />
        ))}
      </Grid>
      {visibleItems < data.length && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', marginBottom: '20px' }}>
          <Button sx={{ my: 2 }} onClick={handleLoadMore}>
            <Typography>{t('查看更多')}</Typography>
          </Button>
        </div>
      )}
    </div>
  );
}

import * as React from 'react';
import PlanComponent from './PlanComponent';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import { API_CREATE_PLAN } from '../global/constants';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { getAuthToken } from '../utils';

export default function PlanListComponent() {
  const [data, setData] = useState([]);
  const [userToken, setUserToken] = useState(getAuthToken());
  const [visibleItems, setVisibleItems] = useState(3);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const config = {
      headers: { 
        authorization: `Bearer ${userToken}`
      }
    };
    //取得計畫列表
    axios.get(API_CREATE_PLAN, config)
      .then(function (res) {
        console.log(res.data);
        setData(res.data);
      })
      .catch(function (err) {
        console.log(err);
        alert("error");
      });
  }, []);

  const handleLoadMore = () => {
    setVisibleItems(prevVisibleItems => prevVisibleItems + 3);
  };

  return (
    <div>
      <Grid container spacing={2}>
        {data.slice(0, visibleItems).map((plan) => {
          return (
            <PlanComponent data={plan} key={plan.id} />
          );
        })}
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

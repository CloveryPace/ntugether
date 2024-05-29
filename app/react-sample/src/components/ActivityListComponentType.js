import React, { useState, useEffect } from 'react';
import ActivityComponent from './ActivityComponent';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import { API_CREATE_ACTIVITY } from '../global/constants';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { getAuthToken } from '../utils';
import dayjs from 'dayjs';

export default function ActivityListComponentType({ filterType }) {
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

    axios.get(API_CREATE_ACTIVITY, config)
      .then(function (res) {
        setData(res.data);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);

  const handleLoadMore = () => {
    setVisibleItems(prevVisibleItems => prevVisibleItems + 6);
  };

  const filteredData = data.filter(activity => activity.type === filterType);
  console.log(filterType);
  console.log(filteredData);
  console.log("全部");
  console.log(data);

  return (
    <div>
      <Grid container spacing={2}>
        {filteredData.slice(0, visibleItems).map((data) => (
          <ActivityComponent data={data} />
        ))}
      </Grid>
      {visibleItems < filteredData.length && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', marginBottom: '20px' }}>
          <Button sx={{ my: 2 }} onClick={handleLoadMore}>
            <Typography>{t('查看更多')}</Typography>
          </Button>
        </div>
      )}
    </div>
  );
}
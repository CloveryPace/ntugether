import React, { useState } from 'react';
import { List, Typography, Button } from '@mui/material';
import RecentActivityItem from './RecentActivityItem';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { getAuthToken } from '../utils';
import axios from 'axios';
import dayjs from 'dayjs';
import { API_CREATE_ACTIVITY } from '../global/constants';

export default function RecentActivityList() {
  const { t, i18n } = useTranslation();
  const initialDisplayCount = 2;
  const incrementCount = 3;
  const [recentActivity, setRecentActivity] = useState([]);

  const [displayCount, setDisplayCount] = useState(initialDisplayCount);

  const handleShowMore = () => {
    setDisplayCount(prevCount => prevCount + incrementCount);
  };

  useEffect(() => {
    const token = getAuthToken();
    const config = {
        headers: { 
          authorization: `Bearer ${token}`,
        },
        params: { 
          start_date: dayjs().toJSON(),
          mode: "joined"
        } 
    };
    //取得最近活動
    axios.get(API_CREATE_ACTIVITY, config)
      .then(function (res) {
        console.log(res.data);
        setRecentActivity(res.data);
      })
      .catch(function (err) {
        console.log(err);
        alert("error");
      });
    }, []);


  return (
    <div>
      <Typography variant="h5" gutterBottom>
        {t('即將來臨的活動')}
      </Typography>
      <List>
        {recentActivity.slice(0, displayCount).map((item, index) => (
          <RecentActivityItem key={index} item={item} />
        ))}
      </List>
      {displayCount < recentActivity.length && (
        <Button onClick={handleShowMore}>
          <Typography>{t('查看更多')}</Typography>
        </Button>
      )}
    </div>
  );
}
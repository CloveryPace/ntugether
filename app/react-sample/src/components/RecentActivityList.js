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
  const token = getAuthToken();
  const [activity, setActivity] = useState([]);

  const [displayCount, setDisplayCount] = useState(initialDisplayCount);

  const handleShowMore = () => {
    setDisplayCount(prevCount => prevCount + incrementCount);
  };

  const getActivityData = (mode_param) => {
    const config = {
      headers: { 
        authorization: `Bearer ${token}`
      },
      params: {
        start_date: dayjs().toJSON(),
        end_date: dayjs().add(7, 'day').toJSON(),
        mode: mode_param
      }
    };

    //取得活動資訊
    axios.get(API_CREATE_ACTIVITY, config)
      .then(function (res) {

        res.data.map((item) => {
          let data = {};
          data['date'] = dayjs(item.date).format('YYYY/MM/DD h:mm A');
          data['name'] = item.name;
          data['location'] = item.llocation;
          setActivity([
            ...activity,
            data
          ]);
        });

        console.log(activity);
        
        })
      .catch(function (err) {
        console.log(err);
    });
}

  useEffect(() => {
    getActivityData('joined');
  }, []);

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        {t('即將來臨的活動')}
      </Typography>
      <List>
        {activity.slice(0, displayCount).map((item, index) => (
          <RecentActivityItem key={index} item={item} />
        ))}
      </List>
      {displayCount < activity.length && (
        <Button onClick={handleShowMore}>
          <Typography>{t('查看更多')}</Typography>
        </Button>
      )}
    </div>
  );
}
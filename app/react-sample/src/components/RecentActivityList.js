import React, { useState } from 'react';
import { List, Typography, Button } from '@mui/material';
import RecentActivityItem from './RecentActivityItem';
import {useTheme} from '@mui/material';


export default function RecentActivityList() {
  const theme = useTheme();

  const initialDisplayCount = 2;
  const incrementCount = 3;

  const recentActivity = [
    { date: '4/5', time: '11:00-12:00', name: '慢跑' , location: '大安森林公園'},
    { date: '4/11', time: '11:00-13:00', name: '籃球', location: '台大新體'},
    { date: '4/11', time: '11:00-13:00', name: '籃球', location: '台大新體'},
    { date: '4/11', time: '11:00-13:00', name: '籃球', location: '台大新體'},
    { date: '4/11', time: '11:00-13:00', name: '籃球', location: '台大新體'},
    { date: '4/11', time: '11:00-13:00', name: '籃球', location: '台大新體'},
    { date: '4/11', time: '11:00-13:00', name: '籃球', location: '台大新體'},
    { date: '4/11', time: '11:00-13:00', name: '籃球', location: '台大新體'},
    { date: '4/11', time: '11:00-13:00', name: '籃球', location: '台大新體'},
    { date: '4/11', time: '11:00-13:00', name: '籃球', location: '台大新體'},
    { date: '4/11', time: '11:00-13:00', name: '籃球', location: '台大新體'},
    { date: '4/11', time: '11:00-13:00', name: '籃球', location: '台大新體'},
    { date: '4/11', time: '11:00-13:00', name: '籃球', location: '台大新體'}
  ];

  const [displayCount, setDisplayCount] = useState(initialDisplayCount);

  const handleShowMore = () => {
    setDisplayCount(prevCount => prevCount + incrementCount);
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        即將來臨的活動
      </Typography>
      <List>
        {recentActivity.slice(0, displayCount).map((item, index) => (
          <RecentActivityItem key={index} item={item} />
        ))}
      </List>
      {displayCount < recentActivity.length && (
        <Button onClick={handleShowMore}>
          <Typography>查看更多</Typography>
        </Button>
      )}
    </div>
  );
}
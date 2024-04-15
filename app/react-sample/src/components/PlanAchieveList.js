import React, { useState } from 'react';
import { List, Typography, Button } from '@mui/material';
import PlanAchieveItem from './PlanAchieveItem';

export default function PlanAchieveList() {

  const initialDisplayCount = 2; 
  const incrementCount = 3; 

  const planAchieve = [
    { name: '健身計畫', percentage: 50 },
    { name: '每日讀書計畫', percentage: 34 },
    { name: '每日讀書計畫', percentage: 34 },
    { name: '每日讀書計畫', percentage: 34 },
    { name: '每日讀書計畫', percentage: 34 },
    { name: '每日讀書計畫', percentage: 34 },
    { name: '每日讀書計畫', percentage: 34 }
  ];

  const [displayCount, setDisplayCount] = useState(initialDisplayCount);

  const handleShowMore = () => {
    setDisplayCount(prevDisplayCount => prevDisplayCount + incrementCount);
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        進度達成比例
      </Typography>
      <List>
        {planAchieve.slice(0, displayCount).map((item, index) => (
          <PlanAchieveItem key={index} item={item} />
        ))}
      </List>
      {displayCount < planAchieve.length && (
        <Button onClick={handleShowMore}>
          <Typography>查看更多</Typography>
        </Button>
      )}
    </div>
  );
}

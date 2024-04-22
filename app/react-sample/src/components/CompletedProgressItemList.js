import React, { useState } from 'react';
import { List, Typography, Button } from '@mui/material';
import CompletedProgressItem from './CompletedProgressItem';

export default function CompletedProgressItemList() {

  const initialDisplayCount = 2;
  const incrementCount = 3;

  const recentActivity = [
    { time: '2024/01/01', name: '英文' , detail: 'XXXX'},
    { time: '2024/01/01', name: '英文', detail: 'XXXX'},
    { time: '2024/01/01', name: '英文', detail: 'XXXX'},
  ];

  const [displayCount, setDisplayCount] = useState(initialDisplayCount);

  const handleShowMore = () => {
    setDisplayCount(prevCount => prevCount + incrementCount);
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        已完成列表
      </Typography>
      <List>
        {recentActivity.slice(0, displayCount).map((item, index) => (
          <CompletedProgressItem key={index} item={item} />
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
import React, { useState } from 'react';
import { List, Typography, Button } from '@mui/material';
import ProgressItemInList from './ProgressItemInList';
import { Box} from '@mui/material';

export default function CompletedProgressItemList({ progressItems, onUpdate}) {
  const initialDisplayCount = 3;
  const incrementCount = 3;

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
        {progressItems.slice(0, displayCount).map((item, index) => (
          <ProgressItemInList key={index} item={item} onUpdate={onUpdate}/>
        ))}
      </List>
      {displayCount < progressItems.length && (
        <Box sx={{ display: 'flex', justifyContent: 'center'}}>
          <Button onClick={handleShowMore}>
            <Typography>查看更多</Typography>
          </Button>
        </Box>
      )}
    </div>
  );
}

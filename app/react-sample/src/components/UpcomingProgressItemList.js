import React, { useState } from 'react';
import { List, Typography, Button, Box } from '@mui/material';
import ProgressItemInList from './ProgressItemInList';
import { useTranslation } from 'react-i18next';

export default function UpcomingProgressItemList({ progressItems, onUpdate }) {
  const { t } = useTranslation();
  const initialDisplayCount = 3;
  const incrementCount = 3;

  const [displayCount, setDisplayCount] = useState(initialDisplayCount);

  const handleShowMore = () => {
    setDisplayCount(prevCount => prevCount + incrementCount);
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        {t('待完成列表')}
      </Typography>
      <List>
        {progressItems.slice(0, displayCount).map((item, index) => (
          <ProgressItemInList key={index} item={item} onUpdate={onUpdate} />
        ))}
      </List>
      {displayCount < progressItems.length && (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button onClick={handleShowMore}>
            <Typography>{t('查看更多')}</Typography>
          </Button>
        </Box>
      )}
    </div>
  );
}

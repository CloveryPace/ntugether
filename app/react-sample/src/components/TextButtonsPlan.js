import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function TextButtons() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const handleFilter = (type) => {
    navigate('/planList', { state: { type } });
  };

  return (
    <Stack direction="row" justifyContent="center" spacing={2}>
      <Button variant="contained" color='primary' onClick={() => handleFilter('學習')}>{t('學習')}</Button> 
      <Button variant="contained" color='primary' onClick={() => handleFilter('考試')}>{t('考試')}</Button>
      <Button variant="contained" color='primary' onClick={() => handleFilter('運動')}>{t('運動')}</Button>
      <Button variant="contained" color='primary' onClick={() => handleFilter('其他')}>{t('其他')}</Button>
      <h1> </h1>
      <Button color='primary' onClick={() => navigate('/planList')}>
      <Typography> {t('查看所有計畫')}</Typography>
      </Button>
    </Stack>
  );
}

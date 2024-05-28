import React from 'react';
import ActivityListComponentType from "../components/ActivityListComponentType";
import { ThemeProvider } from '@mui/material/styles';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useLocation, useNavigate } from 'react-router-dom';
import theme from '../components/Theme'; 
import HeaderBar from '../components/HeaderBar';
import { useTranslation } from 'react-i18next';
import './Common.css';

function ActivityListType() {
  const navigate = useNavigate();
  const location = useLocation();
  const filterType = location.state?.type || '';
  const { t, i18n } = useTranslation();

  const getTitle = () => {
    switch (filterType) {
      case '學習':
        return t('活動列表-學習');
      case '出遊':
        return t('活動列表-出遊');
      case '運動':
        return t('活動列表-運動');
      case '其他':
        return t('活動列表-其他');
      default:
        return t('');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <HeaderBar />
      <div className='Main'>
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} style={{ marginBottom: '20px' }} >
          <Typography variant="h4">{(getTitle())}</Typography>
          <Button variant="contained" color="primary" onClick={() => navigate('/newactiviy')}> {t("新增活動")} </Button> 
        </Stack>
        <ActivityListComponentType filterType={filterType} />
      </div>
    </ThemeProvider>
  );
}

export default ActivityListType;

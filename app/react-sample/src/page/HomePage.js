import './Common.css';
import HeaderBar from '../components/HeaderBar';
import MainInform from '../components/MainInform';
import TextButtons from '../components/TextButtons';
import ActivityListComponent from '../components/ActivityListComponent';
import PlanListComponent from '../components/PlanListComponent';
import Footer from '../components/Footer';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';

import { ThemeProvider } from '@mui/material/styles';
import { Typography } from '@mui/material';

import theme from '../components/Theme'; 

import { useTranslation } from 'react-i18next';

import TextButtonsPlan from '../components/TextButtonsPlan';

function HomePage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  
  return (
    <ThemeProvider theme={theme}>
      <HeaderBar />
      <div className='Main'>
        <Typography variant="h4">{t('我的活動與計畫')}</Typography>

        <MainInform />

        <Typography variant="h4">{t('活動類別')}</Typography>
        <TextButtons />
        <Stack direction="row" justifyContent="space-between" spacing={2} sx={{mt: 2, mb: 2}}>
          <Typography variant="h4">{t('熱門活動')}</Typography>
          <Button variant="contained" color="primary" onClick={() => navigate('/newactivity')}> {t('新增活動')} </Button> 
        </Stack>
        <ActivityListComponent />

        <Typography variant="h4">{t('計畫類別')}</Typography>
        <TextButtonsPlan />
        <Stack direction="row" justifyContent="space-between" spacing={2} sx={{mt: 2, mb: 2}}>
          <Typography variant="h4">{t('熱門計畫')}</Typography>
          <Button variant="contained" color="primary" onClick={() => navigate('/planNew')}> {t('新增計畫')} </Button> 
        </Stack>
        <PlanListComponent filterType="所有" />
      </div>

      <Footer />
    </ThemeProvider>
  );
}

export default HomePage;

import Progress from "../components/Progress";
import { ThemeProvider } from '@mui/material/styles';
import { Typography} from '@mui/material';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { Divider } from '@mui/material';
import { useTranslation } from 'react-i18next';
import theme from '../components/Theme'; 
import HeaderBar from '../components/HeaderBar';
import UserPageNav from '../components/UserPageNav'

import './Common.css';

import AttendedPlanListComponent from "../components/AttendedPlanListComponent";


function PlanManage() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();


  return (
    <ThemeProvider theme={theme}>
    <HeaderBar />
    <UserPageNav selectedTab={2}/> 
    <div className='Main'>
    <Typography variant="h5"> {t('參與紀錄')} </Typography>
    <Typography variant="h6"> {t('即將開始')} </Typography>
    <AttendedPlanListComponent/>
    <Typography variant="h6"> {t('已結束')} </Typography>
    <AttendedPlanListComponent/>
    <Divider />
    <Typography variant="h5"> {t('發起紀錄')} </Typography>
    <Typography variant="h6"> {t('即將開始')} </Typography>
    <AttendedPlanListComponent/>
    <Typography variant="h6"> {t('已結束')} </Typography>
    <AttendedPlanListComponent/>
    </div>
</ThemeProvider>
  );
}

export default PlanManage;
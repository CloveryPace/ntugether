// 顯示使用者多活動參加、發起資訊

import ActivityEndComponent from "../components/ActivityEndComponent.js";
import ActivityStartComponent from "../components/ActivityStartComponent.js";
import { ThemeProvider } from '@mui/material/styles';
import { Typography, Divider} from '@mui/material';
import theme from '../components/Theme'; 
import HeaderBar from '../components/HeaderBar';
import './Common.css';
import UserPageNav from '../components/UserPageNav';
import { useTranslation } from 'react-i18next';

function ActivityAttendPage() {
    const { t, i18n } = useTranslation();
    return (
        <ThemeProvider theme={theme}>
            <HeaderBar />
            <UserPageNav selectedTab={1}/> 
            <div className='Main'>
            <Typography variant="h5"> {t('參與紀錄')} </Typography>
            <Typography variant="h6"> {t('即將開始')} </Typography>
            <ActivityStartComponent mode_param="joined"/>
            <Typography variant="h6"> {t('已結束')} </Typography>
            <ActivityEndComponent mode_param="joined"/>
            <Divider />
            <Typography variant="h5"> {t('發起紀錄')} </Typography>
            <Typography variant="h6"> {t('即將開始')} </Typography>
            <ActivityStartComponent mode_param="owned"/>
            <Typography variant="h6"> {t('已結束')} </Typography>
            <ActivityEndComponent mode_param="owned"/>
            </div>
        </ThemeProvider>
  );
}

export default ActivityAttendPage;
// 顯示使用者多活動參加、發起資訊

import ActivityListComponent from "../components/ActivityListComponent.js";
import { ThemeProvider } from '@mui/material/styles';
import { Typography, Divider} from '@mui/material';
import theme from '../components/Theme'; 
import HeaderBar from '../components/HeaderBar';
import './Common.css';
import UserPageNav from '../components/UserPageNav';

function ActivityAttendPage() {

    return (
        <ThemeProvider theme={theme}>
            <HeaderBar />
            <UserPageNav selectedTab={1}/> 
            <div className='Main'>
            <Typography variant="h5"> 參與紀錄 </Typography>
            <Typography variant="h6"> 即將開始 </Typography>
            <ActivityListComponent/>
            <Typography variant="h6"> 已結束 </Typography>
            <ActivityListComponent/>
            <Divider />
            <Typography variant="h5"> 發起紀錄 </Typography>
            <Typography variant="h6"> 即將開始 </Typography>
            <ActivityListComponent/>
            <Typography variant="h6"> 已結束 </Typography>
            <ActivityListComponent/>
            </div>
        </ThemeProvider>
  );
}

export default ActivityAttendPage;
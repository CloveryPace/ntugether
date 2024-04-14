// 顯示多活動資訊方塊（ActivityComponent）

import Stack from '@mui/material/Stack';
import ActivityComponent from "../components/ActivityComponent";
import ActivityListComponent from "../components/ActivityListComponent.js";
import { ThemeProvider } from '@mui/material/styles';
import { Typography} from '@mui/material';

import theme from '../components/Theme'; 
import HeaderBar from '../components/HeaderBar';

import './Common.css';


function ActivityList() {


  return (
    <ThemeProvider theme={theme}>
      <HeaderBar />
      <div className='Main'>
      <Typography variant="h4">活動列表</Typography>
      <ActivityListComponent/>
      </div>
    </ThemeProvider>
  );
}

export default ActivityList;
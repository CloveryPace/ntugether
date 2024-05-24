// 顯示多活動資訊方塊（ActivityComponent）

import ActivityListComponent from "../components/ActivityListComponent.js";
import { ThemeProvider } from '@mui/material/styles';
import { Typography} from '@mui/material';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';

import theme from '../components/Theme'; 
import HeaderBar from '../components/HeaderBar';
import './Common.css';


function ActivityList() {
  const navigate = useNavigate();
  return (
    <ThemeProvider theme={theme}>
      <HeaderBar />
      <div className='Main'>
      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} style={{ marginBottom: '20px' }} >
        <Typography variant="h4"> 活動列表 </Typography>
        <Button variant="contained" color="primary" onClick={() => navigate('/newactivity')}> 新增活動 </Button> 
      </Stack>
      <ActivityListComponent/>
      </div>
    </ThemeProvider>
  );
}

export default ActivityList;
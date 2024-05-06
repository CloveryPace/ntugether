// 顯示多活動資訊方塊（ActivityComponent）


import PlanListComponent from "../components/PlanListComponent";
import { ThemeProvider } from '@mui/material/styles';
import { Typography} from '@mui/material';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';

import theme from '../components/Theme'; 
import HeaderBar from '../components/HeaderBar';

import './Common.css';


function PlanList() {
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <HeaderBar />
      <div className='Main'>
      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} style={{ marginBottom: '20px' }} >
        <Typography variant="h4"> 進度計畫列表 </Typography>
        <Button variant="contained" color="primary" onClick={() => navigate('/newactivity')}> 新增計畫 </Button> 
      </Stack>
      <PlanListComponent/>
      </div>
    </ThemeProvider>
  );
}

export default PlanList;
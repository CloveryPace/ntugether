// 顯示多活動資訊方塊（ActivityComponent）

import ActivityComponent from "../components/ActivityComponent";
import HeaderBar from '../components/HeaderBar';
import { ThemeProvider } from '@mui/material/styles';
import { Typography} from '@mui/material';
import theme from '../components/Theme'; 
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';

function ActivityList() {
  const navigate = useNavigate();
  const style = { 
    padding: "6rem 15rem 10rem 15rem"
  };
  const instyle = { 
    padding: "1.5rem 0 0 0" 
  };

  return (

    <ThemeProvider theme={theme}>
      <HeaderBar></HeaderBar>
      <div style={style}>

      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
        <Typography variant="h5"> 活動列表 </Typography>
        <Button variant="contained" color="primary" onClick={() => navigate('/newactivity')}> 新增活動 </Button> 
      </Stack>

        <div style={instyle}>
          <ActivityComponent></ActivityComponent>
        </div>

      </div>
    </ThemeProvider>
  );
}

export default ActivityList;
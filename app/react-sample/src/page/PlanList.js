import React from 'react';
import PlanListComponent from "../components/PlanListComponent";
import { ThemeProvider } from '@mui/material/styles';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useLocation, useNavigate } from 'react-router-dom';
import theme from '../components/Theme'; 
import HeaderBar from '../components/HeaderBar';

import './Common.css';

function PlanList() {
  const navigate = useNavigate();
  const location = useLocation();
  const filterType = location.state?.type || '所有';

  const getTitle = () => {
    switch (filterType) {
      case '學習':
        return '學習計畫列表';
      case '考試':
        return '考試計畫列表';
      case '運動':
        return '運動計畫列表';
      case '其他':
        return '其他計畫列表';
      default:
        return '計畫列表';
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <HeaderBar />
      <div className='Main'>
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} style={{ marginBottom: '20px' }} >
          <Typography variant="h4">{getTitle()}</Typography>
          <Button variant="contained" color="primary" onClick={() => navigate('/planNew')}> 新增計畫 </Button> 
        </Stack>
        <PlanListComponent filterType={filterType} />
      </div>
    </ThemeProvider>
  );
}

export default PlanList;

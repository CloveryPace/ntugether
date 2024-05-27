import * as React from 'react';
import { ListItem, ListItemText, Paper, LinearProgress, useTheme} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getAuthToken } from '../utils';
import { API_GET_PLAN_DETAIL } from '../global/constants'; // API constants
import axios from 'axios';

function PlanAchieveItem({ planId, planName }) {
  const { t } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();
  const [userToken, setUserToken] = useState(getAuthToken());
  const [progressData, setProgressData] = useState(null);

  useEffect(() => {
    const token = userToken;
    const config = {
      headers: {
        authorization: `Bearer ${token}`
      }
    };

    // Fetch plan user progress information
    axios.get(`${API_GET_PLAN_DETAIL}${planId}/ownuserprocess`, config)
      .then(res => {
        setProgressData(res.data);
        console.log(res.data);
      })
      .catch(err => {
        console.error('Error fetching progress data:', err);
      });
  }, [planId, userToken]);

  if (!progressData) {
    return <div>{t('Loading')}</div>;
  }

  const { progressSummary } = progressData;

  const totalProgress = Object.values(progressSummary).reduce((total, item) => total + item.total_count, 0);
  const totalCompleted = Object.values(progressSummary).reduce((total, item) => total + item.finished_count, 0);
  const completionPercentage = (totalCompleted / totalProgress) * 100;

  return (
      <Paper elevation={3} style={{ marginBottom: '10px', padding: '10px', height: '90px', backgroundColor: theme.palette.primary.light}} onClick={() => navigate(`/planPage`, { state: { id: planId } })} sx={{ cursor: 'pointer' }}>
        <ListItem>
          <ListItemText primary={planName} 
          secondary={
              <>  
                  {t('已經達成')} {completionPercentage.toFixed(1)} %
                  
                  <LinearProgress variant="determinate" value={completionPercentage} 
                  sx={{ 
                    height: '10px', 
                    backgroundColor: '#FFFFFF',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: theme.palette.secondary.main,
                    }
                  }}/>
              </>
            } />
        </ListItem>
      </Paper>
  );
}

export default PlanAchieveItem;



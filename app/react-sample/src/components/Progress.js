import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getAuthToken } from '../utils';
import { API_GET_PLAN_DETAIL } from '../global/constants'; // API constants
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const Progress = ({ planId, planName }) => {
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
    <Grid item xs={12} md={4}>
      <Card variant="outlined" onClick={() => navigate(`/planPage`, { state: { id: planId } })} sx={{ cursor: 'pointer' }}>
        <CardContent sx={{ pb: 0 }}>
          <Typography variant="h5" sx={{ mb: 1.5, mt: 1.5 }}>{planName}</Typography>
          <Typography variant="body1" sx={{ mb: 1.5, mt: 1.5 }}>
            {completionPercentage.toFixed(1)}%，{t('已完成')} {totalCompleted} {t('個進度')}，{t('待完成')} {totalProgress - totalCompleted} {t('個進度')}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={completionPercentage}
            sx={{ height: '10px', mb: 1.5 }}
          />
          <ul>
            {Object.values(progressSummary).map((item, index) => {
              const itemCompletionPercentage = (item.finished_count / item.total_count) * 100;
              return (
                <li key={index}>
                  <Typography variant="body2">
                    {item.progress_name} {itemCompletionPercentage.toFixed(1)}%，{t('已完成')} {item.finished_count} {t('個進度')}，{t('待完成')} {item.total_count - item.finished_count} {t('個進度')}
                  </Typography>
                </li>
              );
            })}
          </ul>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default Progress;

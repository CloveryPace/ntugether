import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import LinearProgress from '@mui/material/LinearProgress';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { getAuthToken } from '../utils';
import { API_GET_USER_PROGRESS } from '../global/constants';

export default function ProgressAttendee({ progresses }) {
  const [progressData, setProgressData] = useState([]);
  const [showProgress, setShowProgress] = useState({});
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (!Array.isArray(progresses)) {
      console.error("progresses should be an array");
      return;
    }

    const fetchProgressData = async () => {
      const token = getAuthToken();
      const config = {
        headers: { "authorization": `Bearer ${token}` }
      };
      
      const allUserProgress = {};

      for (let progress of progresses) {
        try {
          const response = await axios.get(`${API_GET_USER_PROGRESS}${progress.progress_id}/alluserprocess`, config);
          const data = response.data;

          Object.keys(data).forEach(userId => {
            if (!allUserProgress[userId]) {
              allUserProgress[userId] = {
                userId: userId,
                userName: data[userId].user_name,
                totalCount: 0,
                finishedCount: 0,
                details: []
              };
            }
            allUserProgress[userId].totalCount += data[userId].total_count;
            allUserProgress[userId].finishedCount += data[userId].finished_count;
            allUserProgress[userId].details.push({
              progressName: data[userId].progress_name,
              completionRate: (data[userId].finished_count / data[userId].total_count) * 100
            });
          });
        } catch (error) {
          console.error('Error fetching progress data:', error);
        }
      }

      setProgressData(Object.values(allUserProgress));
    };

    fetchProgressData();
  }, [progresses]);

  const toggleProgress = (userId) => {
    setShowProgress(prevState => ({
      ...prevState,
      [userId]: !prevState[userId]
    }));
  };

  /*
  console.log("allUserProgress");
  console.log(progressData);
*/

  return (
    <Box sx={{ minWidth: 275 }}>
      {progressData.map((userProgress) => {
        const completionRate = (userProgress.finishedCount / userProgress.totalCount) * 100;
        return (
          <Card variant="outlined" key={userProgress.userId} sx={{ mb: 2 }}>
            <CardContent sx={{ pb: 0 }}>
              <Avatar sx={{ mb: 1.5 }}></Avatar>
              <Typography variant="body1" sx={{ mb: 1.5 }}>
                {`${completionRate.toFixed(2)}%，已完成${userProgress.finishedCount}個進度，待完成${userProgress.totalCount - userProgress.finishedCount}個進度`}
              </Typography>
              <LinearProgress variant="determinate" value={completionRate} sx={{ height: 10, mb: 1.5 }} />
              {showProgress[userProgress.userId] && (
                <Typography variant="body2" sx={{ mb: 1.5 }}>
                  <ul>
                    {userProgress.details.map(detail => (
                      <li key={detail.progressName}>{`${detail.progressName} ${detail.completionRate.toFixed(2)}%`}</li>
                    ))}
                  </ul>
                </Typography>
              )}
            </CardContent>
            <CardActions sx={{ p: '16px' }}>
              {showProgress[userProgress.userId] ? (
                <Button variant="text" onClick={() => toggleProgress(userProgress.userId)}>
                  {t('▲ 隱藏細項')}
                </Button>
              ) : (
                <Button variant="text" onClick={() => toggleProgress(userProgress.userId)}>
                  {t('▼ 展開細項')}
                </Button>
              )}
            </CardActions>
          </Card>
        );
      })}
    </Box>
  );
}





/*
import React from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import LinearProgress from '@mui/material/LinearProgress';
import { useTranslation } from 'react-i18next';
const { useState } = React;

export default function ProgressAttendee(progresses) {
  const [progress, setProgress] = useState(70);
  const [showProgress, setShowProgress] = useState(false);
  const { t, i18n } = useTranslation();



  const toggleProgress = () => {
    setShowProgress(!showProgress);
  }


  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
        <CardContent  sx={{pb: 0  }}>
          <Avatar sx={{ mb: 1.5  }}></Avatar>
          <Typography variant="body1" sx={{mb: 1.5  }}>
          60%，已完成18個進度，待完成12個進度
          </Typography>
          <LinearProgress variant="determinate" value={progress} sx={{height: 10, mb: 1.5 }} />
          { 
            showProgress? <Typography variant="body2" sx={{mb: 1.5  }}>
            <ul>
               <li>英文 70%</li>
               <li>國文 70%</li>
               <li>數學 80%</li>
            </ul>
           </Typography>
            : null
          }
        </CardContent>
        <CardActions sx={{p: '16px'}}>
          { 
            showProgress? <Button variant="text" onClick={toggleProgress} >{t('▲ 隱藏細項')}</Button> : <Button variant="text" onClick={toggleProgress}>{t('▼ 展開細項')}</Button>

          }          
        </CardActions>
       </Card>
    </Box>
  );
}
*/
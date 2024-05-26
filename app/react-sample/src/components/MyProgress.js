import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_GET_USER, API_GET_USER_PROGRESS } from '../global/constants';
import { getAuthToken } from '../utils';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import LinearProgress from '@mui/material/LinearProgress';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import CompletedProgressItemList from './CompletedProgressItemList';
import UpcomingProgressItemList from './UpcomingProgressItemList';
import { useTranslation } from 'react-i18next';

export default function MyProgress({ progresses }) {
  const { t } = useTranslation();
  const [userToken, setUserToken] = useState(getAuthToken());
  const [userProgressData, setUserProgressData] = useState([]);
  const [username, setUsername] = useState('');
  const [progressDetails, setProgressDetails] = useState({});

  useEffect(() => {
    fetchData();
  }, [userToken, progresses]);

  const fetchData = async () => {
    const token = userToken;
    const config = {
      headers: { 'Authorization': `Bearer ${token}` },
    };

    const fetchProgressData = async (progress_id) => {
      try {
        const response = await axios.get(`${API_GET_USER_PROGRESS}/${progress_id}/userprocess`, config);
        return response.data;
      } catch (err) {
        console.error(`Error fetching progress data for progress_id ${progress_id}:`, err);
        return { data: [] };
      }
    };

    try {
      const userResponse = await axios.get(API_GET_USER, config);
      setUsername(userResponse.data.members['name']);

      const dataPromises = progresses.map(progress => fetchProgressData(progress.progress_id));
      const allData = await Promise.all(dataPromises);
      setUserProgressData(allData);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  useEffect(() => {
    const calculateProgress = () => {
      if (!Array.isArray(progresses) || !Array.isArray(userProgressData)) {
        return {};
      }

      const subjects = progresses.reduce((acc, progress) => {
        acc[progress.name] = { total: 0, finished: 0 };
        return acc;
      }, {});

      userProgressData.forEach(progressGroup => {
        if (progressGroup && Array.isArray(progressGroup.data)) {
          progressGroup.data.forEach(item => {
            const progress = progresses.find(p => p.progress_id === item.progress_id);
            if (progress) {
              subjects[progress.name].total += 1;
              if (item.is_finished) {
                subjects[progress.name].finished += 1;
              }
            }
          });
        }
      });

      return subjects;
    };

    setProgressDetails(calculateProgress());
  }, [userProgressData, progresses]);

  const handleDataUpdate = () => {
    fetchData();
  };

  const completedProgress = userProgressData.flat().filter(group => group.data.some(item => item.is_finished)).map(group => group.data.filter(item => item.is_finished).map(item => ({ ...item, name: progresses.find(p => p.progress_id === item.progress_id).name, need_activity: progresses.find(p => p.progress_id === item.progress_id).need_activity }))).flat();
  const upcomingProgress = userProgressData.flat().filter(group => group.data.some(item => !item.is_finished)).map(group => group.data.filter(item => !item.is_finished).map(item => ({ ...item, name: progresses.find(p => p.progress_id === item.progress_id).name, need_activity: progresses.find(p => p.progress_id === item.progress_id).need_activity }))).flat();

  return (
    <Box sx={{ width: '100%' }}>
      <Card variant="outlined">
        <CardContent>
          <div style={{ padding: 20 }}>
            <Chip avatar={<Avatar>{username ? username[0] : t("未知")}</Avatar>} label={username ? username : t("未知")} />
            <Typography variant="body1" sx={{ mb: 1.5, mt: 1.5 }}>
              {
                userProgressData.flat().length === 0 ? 
                t("0%") :
                `${Math.round((Object.values(progressDetails).reduce((acc, val) => acc + val.finished, 0) / userProgressData.flat().reduce((acc, val) => acc + val.data.length, 0)) * 100)}%`
              }，{t("已完成")} {
                Object.values(progressDetails).reduce((acc, val) => acc + val.finished, 0)
              } {t("個進度")}，{t("待完成")} {
                userProgressData.flat().reduce((acc, val) => acc + val.data.length, 0) - Object.values(progressDetails).reduce((acc, val) => acc + val.finished, 0)
              } {t("個進度")}
            </Typography>
            <LinearProgress 
              variant="determinate" 
              value={
                userProgressData.flat().length === 0 ? 
                0 : 
                (Object.values(progressDetails).reduce((acc, val) => acc + val.finished, 0) / userProgressData.flat().reduce((acc, val) => acc + val.data.length, 0)) * 100
              } 
              sx={{ height: 10, mb: 1.5 }} 
            />
          </div>
          <Typography variant="body2" sx={{ mb: 1.5 }}>
            <ul>
              {Object.keys(progressDetails).map((subject, index) => (
                <li key={index}>
                  {subject} {
                    progressDetails[subject].total === 0 ? 
                    t("0%") : 
                    `${Math.round((progressDetails[subject].finished / progressDetails[subject].total) * 100)}%`
                  }，{t("已完成")} {
                    progressDetails[subject].finished
                  } {t("個進度")}，{t("待完成")} {
                    progressDetails[subject].total - progressDetails[subject].finished
                  } {t("個進度")}
                </li>
              ))}
            </ul>
          </Typography>
        </CardContent>

        <div style={{ padding: 36, paddingTop: 0 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <CompletedProgressItemList progressItems={completedProgress} onUpdate={handleDataUpdate}/>
            </Grid>
            <Grid item xs={12} md={6}>
              <UpcomingProgressItemList progressItems={upcomingProgress} onUpdate={handleDataUpdate}/>
            </Grid>
          </Grid>
        </div>
      </Card>
    </Box>
  );
}

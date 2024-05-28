import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import LinearProgress from '@mui/material/LinearProgress';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import { useTranslation } from 'react-i18next';
import Link from '@mui/material/Link';

export default function ProgressAttendee({ progresses, userId }) {
  const [showProgress, setShowProgress] = useState({});
  const [groupedProgress, setGroupedProgress] = useState({});
  const { t } = useTranslation();

  const toggleProgress = (id) => {
    setShowProgress((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  useEffect(() => {
    const progressArray = Object.values(progresses);

    const newGroupedProgress = progressArray.reduce((acc, progress) => {
      if (!acc[progress.user_id]) {
        acc[progress.user_id] = { user_name: progress.user_name, progresses: [] };
      }
      acc[progress.user_id].progresses.push(progress);
      return acc;
    }, {});

    setGroupedProgress(newGroupedProgress);
  }, [progresses]);

  const otherParticipants = Object.keys(groupedProgress).filter(id => parseInt(id) !== userId);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        {otherParticipants.length > 0 ? (
          otherParticipants.map((id) => {
            const userProgress = groupedProgress[id];
            const userProgresses = userProgress.progresses;
            const totalTasks = userProgresses.reduce((sum, progress) => sum + progress.total_count, 0);
            const finishedTasks = userProgresses.reduce((sum, progress) => sum + progress.finished_count, 0);
            const percentage = totalTasks > 0 ? (finishedTasks / totalTasks) * 100 : 0;

            return (
              <Grid item xs={12} md={4} key={id}>
                <Card variant="outlined">
                  <CardContent sx={{ pb: 0 }}>
                    <br/>
                    <Link href={'/user?id='+id} underline="none">
                    <Chip avatar={<Avatar>{userProgress.user_name ? userProgress.user_name[0] : t("未知")}</Avatar>} label={userProgress.user_name ? userProgress.user_name : t("未知")} /></Link>
                    <br/>
                    <br/>
                    <Typography variant="body1" sx={{ mb: 1.5 }}>
                      {t('{{percentage}}%，已完成{{finishedTasks}}個進度，待完成{{remainingTasks}}個進度', {
                        percentage: percentage.toFixed(0),
                        finishedTasks,
                        remainingTasks: totalTasks - finishedTasks
                      })}
                    </Typography>
                    <LinearProgress variant="determinate" value={percentage} sx={{ height: 10, mb: 1.5 }} />
                    {showProgress[id] && (
                      <Typography variant="body2" sx={{ mb: 1.5 }}>
                        <ul>
                          {userProgresses.map((progress) => (
                            <li key={progress.progress_id}>
                              {t('{{progressName}} {{progressPercentage}}%，已完成{{finishedCount}}個進度，待完成{{remainingCount}}個進度', {
                                progressName: progress.progress_name,
                                progressPercentage: ((progress.finished_count / progress.total_count) * 100).toFixed(0),
                                finishedCount: progress.finished_count,
                                remainingCount: progress.total_count - progress.finished_count
                              })}
                            </li>
                          ))}
                        </ul>
                      </Typography>
                    )}
                  </CardContent>
                  <CardActions sx={{ p: '16px' }}>
                    <Button variant="text" onClick={() => toggleProgress(id)}>
                      {showProgress[id] ? t('▲ 隱藏細項') : t('▼ 展開細項')}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })
        ) : (
          <Grid item xs={12} md={4}>
          <Typography variant="h6">
            {t('目前無其他參與者')}
          </Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}

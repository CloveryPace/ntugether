import * as React from 'react';
import { useTheme, Grid } from '@mui/material';
import BasicDateCalendar from './BasicDateCalendar';
import RecentActivityList from './RecentActivityList';
import PlanAchieveList from './PlanAchieveList';

export default function MainInform() {
  const theme = useTheme();
  return (
    <div style={{ backgroundColor: theme.palette.primary.main, padding: 60 }}>
      <Grid container spacing={6}>
        <Grid item xs={12} md={4}>
          <BasicDateCalendar />
        </Grid>
        <Grid item xs={12} md={4}>
          <RecentActivityList />
        </Grid>
        <Grid item xs={12} md={4}>
          <PlanAchieveList />
        </Grid>
      </Grid>
    </div>
  );
}
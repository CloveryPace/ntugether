import * as React from 'react'; 

import ActivityComponentHome from './ActivityComponentHome';
import Button from '@mui/material/Button';

import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';


export default function ActivityList() {
    return (

    <div>
      <Grid container spacing={2}>
        <ActivityComponentHome />
        <ActivityComponentHome />
        <ActivityComponentHome />
        <ActivityComponentHome />
        <ActivityComponentHome />
        <ActivityComponentHome />

      </Grid>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', marginBottom: '20px' }}>
      <Button sx={{ my: 2 }}><Typography>查看更多</Typography></Button> 
    </div>
    </div>
    );
  }
  
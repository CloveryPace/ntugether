import React from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import LinearProgress from '@mui/material/LinearProgress';
const { useState } = React;

export default function Progress() {

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
        <CardContent  sx={{pb: 0  }}>
          <Typography variant="h5" sx={{mb: 1.5  }}>
          進度計畫名稱
          </Typography>
          <Typography variant="body1" sx={{mb: 1.5  }}>
          60%，已完成18個進度，待完成12個進度
          </Typography>
          <LinearProgress variant="determinate" value={70} sx={{height: 30, mb: 1.5 }} />
        
        </CardContent>
        <CardActions sx={{p: '16px'}}>
          <Button variant="contained" fullWidth="true">查看</Button>
      
        </CardActions>
       </Card>
    </Box>
  );
}

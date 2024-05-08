import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import Grid from '@mui/material/Grid';
import { useTheme} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const { useState } = React;

export default function Progress(item) {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <Grid item xs={12} md={4}>
      <Card variant="outlined" onClick={() => navigate('/planPage')} sx={{cursor: 'pointer'}}>
        <CardContent  sx={{pb: 0  }}>
          <Typography variant="h5" sx={{mb: 1.5  }}>
          進度計畫名稱
          </Typography>
          <Typography variant="body1" sx={{mb: 1.5  }}>
          60%，已完成18個進度，待完成12個進度
          </Typography>
          <LinearProgress variant="determinate" value={item.percentage} 
                  sx={{ 
                    height: '10px', 
                    backgroundColor: '#FFFFFF',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: theme.palette.secondary.main,
                    }
                  }}/>
        
        </CardContent>
       </Card>
    </Grid>
  );
}

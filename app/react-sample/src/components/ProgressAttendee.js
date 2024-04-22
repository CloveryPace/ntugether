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

export default function ProgressAttendee() {
  const [progress, setProgress] = useState(70);
  const [showProgress, setShowProgress] = useState(false);

  const toggleProgress = () => {
    setShowProgress(!showProgress);
  }


  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
        <CardContent  sx={{pb: 0  }}>
          <Avatar sx={{ bgcolor: 'secondary.main', mb: 1.5  }}></Avatar>
          <Typography variant="body1" sx={{mb: 1.5  }}>
          60%，已完成18個進度，待完成12個進度
          </Typography>
          <LinearProgress variant="determinate" value={progress} sx={{height: 30, mb: 1.5 }} />
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
            showProgress? <Button variant="text" onClick={toggleProgress} >▲ 隱藏細項</Button> : <Button variant="text" onClick={toggleProgress}>▼ 展開細項</Button>

          }          
        </CardActions>
       </Card>
    </Box>
  );
}

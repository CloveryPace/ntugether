import React from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import LinearProgress from '@mui/material/LinearProgress';
import Grid from '@mui/material/Grid';
import CompletedProgressItemList from './CompletedProgressItemList';
import UpcomingProgressItemList from './UpcomingProgressItemList';


import { API_GET_USER_PROGRESS } from '../global/constants'; // API 常數


const { useState } = React;

export default function MyProgress({ id }) {

    const [progress, setProgress] = useState(70);

    
    return (
        <Box sx={{ width: '100%' }}>
            <Card variant="outlined">

                <CardContent>
                    <div style={{ padding: 20 }}>
                        <Avatar sx={{mb: 1.5  }}></Avatar>
                        <Typography variant="body1" sx={{ mb: 1.5  }}>
                        60%，已完成18個進度，待完成12個進度
                        </Typography>
                        <LinearProgress variant="determinate" value={progress} sx={{height: 10, mb: 1.5 }} />
                    </div>
                    <Typography variant="body2" sx={{ mb: 1.5  }}>
                        <ul>
                        <li> 英文 70%，已完成7個進度，待完成3個進度 </li>
                        <li> 數學 80%，已完成8個進度，待完成2個進度 </li>
                        <li> 國文 30%，已完成3個進度，待完成7個進度 </li>
                        </ul>
                    </Typography>
                </CardContent>

                <div style={{ padding: 36,  paddingTop: 0}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <CompletedProgressItemList />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <UpcomingProgressItemList />
                        </Grid>
                    </Grid>
                </div>
            </Card>
        </Box>
    );
}
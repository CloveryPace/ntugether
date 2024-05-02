// 活動資訊方塊 

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import {useTheme} from '@mui/material';

import ScheduleIcon from '@mui/icons-material/Schedule';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PeopleIcon from '@mui/icons-material/People';

import { Grid } from '@mui/material';

export default function ActivityComponent({data}) {
    const navigate = useNavigate();
    const theme = useTheme();
    const style = { 
      border: '1.5px solid rgba(0, 0, 0, 0.1)',
      padding: '2rem'
    };

    // TODO: navigate到特定活動頁面（參數：ID）

    return (
        <Grid item xs={12} md={4}>
        <div className="box" style={style}>
          <Stack direction="column">
            <div onClick={() => navigate('/activitypage')}> 
            <Typography variant="h5" gutterBottom>{data.activityName}</Typography>
              <Stack direction="row" spacing={1}>
                <Chip color="secondary" label={data.type || "未指定"}/>
                <Chip color="secondary" label={data.oneTime? "一次性":"長期活動"}/>
              </Stack >

              <Stack direction="column" spacing={2} sx={{ marginTop: '20px', marginBottom: '20px'}}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <ScheduleIcon color="icon" sx={{ paddingRight: '10px'}} />
                  <Typography variant="body1">{data.activityTime}</Typography>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <LocationOnIcon color="icon" sx={{ paddingRight: '10px'}}/>
                  <Typography variant="body1">{data.activityPos}</Typography>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <PeopleIcon color="icon" sx={{ paddingRight: '10px'}}/>
                  <Avatar alt="Remy Sharp"/>
                </div>
              </Stack>
            </div>
          </Stack>
        </div>
        </Grid>
    );
}

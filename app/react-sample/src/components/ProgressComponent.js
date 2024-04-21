// 進度計畫資訊方塊 

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ScheduleIcon from '@mui/icons-material/Schedule';
import PeopleIcon from '@mui/icons-material/People';
import { Grid } from '@mui/material';

export default function ActivityComponent({data}) {
    const style = { 
      border: '1.5px solid rgba(0, 0, 0, 0.1)',
      padding: '2rem'
    };

    // TODO: navigate到特定進度計畫頁面（參數：ID）

    return (
        <Grid item xs={12} md={4}>
        <div className="box" style={style}>
          <Stack direction="column">
            <div> 
            <Typography variant="h5" gutterBottom>進度計畫名稱</Typography>
              <Stack direction="row" spacing={1}>
                <Chip color="secondary" label={"type"}/>
                <Chip color="secondary" label={"需審核"}/>
                <Chip color="secondary" label={"需參加揪團活動"}/>
              </Stack >

              <Stack direction="column" spacing={2} sx={{ marginTop: '20px', marginBottom: '20px'}}>
                 <div style={{ display: "flex", alignItems: "center" }}>
                 <Typography variant="body1">目標：</Typography>
                  <Typography variant="body1">XXXXXX</Typography>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <ScheduleIcon color="icon" sx={{ paddingRight: '10px'}} />
                  <Typography variant="body1">2024/01/01</Typography>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <PeopleIcon color="icon" sx={{ paddingRight: '10px'}}/>
                  <Avatar alt="Remy Sharp"/>
                </div>
              </Stack>

            </div>
              <Button variant="contained" color="primary"> 查看 </Button> 
          </Stack>
        </div>
        </Grid>
    );
}
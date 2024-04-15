// 活動資訊方塊 

import { useState } from "react";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import {useTheme} from '@mui/material';

import ScheduleIcon from '@mui/icons-material/Schedule';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PeopleIcon from '@mui/icons-material/People';

import { Grid } from '@mui/material';

export default function ActivityComponentHome() {
  const theme = useTheme();

    const [openContent, setOpenContent] = useState(false);

    const style = { 
      border: '1.5px solid rgba(0, 0, 0, 0.1)',
      padding: '2rem'
    };

    //  打開 Activity 頁面
    const handleOpen = () => {
        if (openContent === false) {
          setOpenContent(true);
        }
        else {
          setOpenContent(false);
        }
      };

    return (
      <Grid item xs={12} md={4}>
        <div className="box" style={style} onClick={handleOpen}>
          <Stack direction="column">
            <div> 
            <Typography variant="h5" gutterBottom>Activity name</Typography>
              <Stack direction="row" spacing={1}>
                <Chip color="secondary" label="type"/>
                <Chip color="secondary" label="一次性"/>
              </Stack >

              <Stack direction="column" spacing={2} sx={{ marginTop: '20px', marginBottom: '20px'}}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <ScheduleIcon color="icon" sx={{ paddingRight: '10px'}} />
                  <Typography variant="body1">2024/07/01</Typography>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <LocationOnIcon color="icon" sx={{ paddingRight: '10px'}}/>
                  <Typography variant="body1">台大校園</Typography>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <PeopleIcon color="icon" sx={{ paddingRight: '10px'}}/>
                </div>
              </Stack>

            </div>
              <Button variant="contained" color="primary"> 參加 </Button> 
          </Stack>
        </div>
      </Grid>
    );
}

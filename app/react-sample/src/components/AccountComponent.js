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
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useTranslation } from 'react-i18next';


import { Grid } from '@mui/material';

export default function AccountComponent({data}) {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const theme = useTheme();
    const style = { 
      border: '1.5px solid rgba(0, 0, 0, 0.1)',
      padding: '2rem'
    };


    return (
      <Grid item xs={10}>

      <Paper
        sx={{
          p: 2,
          margin: 'auto',
          maxWidth: '100%',
          flexGrow: 1,
          display: 'block',
          cursor: 'pointer',
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        }}
        onClick={() => navigate('/user')}
      >
      <Grid container spacing={2}>
        <Grid item>
          <Avatar alt="Remy Sharp" sx={{ width: {md:128, xs:30}, height: {md:128, xs:30} }}/>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                User name
              </Typography>
              <Typography variant="body2" gutterBottom>
                簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ID: 1030114
              </Typography>
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={() => navigate('')}>{t('取消追蹤')}</Button>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" component="div">
              {t('近期活動')}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
    </Grid>  
        
    );
}

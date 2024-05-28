import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import {useTheme} from '@mui/material';
import Paper from '@mui/material/Paper';
import { useTranslation } from 'react-i18next';
import Link from '@mui/material/Link';


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
      <Link href={'/user?id='+data.followingId} underline="none">
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
        // onClick={() => navigate('/user?id='+data.followingId)}
      >
      <Grid container spacing={2}>
        <Grid item>
          <Avatar alt="Remy Sharp" sx={{ width: {md:128, xs:30}, height: {md:128, xs:30} }}/>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                {data.Following.name}
              </Typography>
              <Typography variant="body2" gutterBottom>
              {data.Following.self_introduction}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ID: {data.followingId}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
    </Link>
    </Grid>  
        
    );
}

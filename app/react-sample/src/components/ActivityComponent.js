// 活動資訊方塊

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { pink, yellow, cyan, orange } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';

const tagTheme = createTheme({
  palette: {
    primary: {
      main: yellow[400],
    },
    secondary:{
      main: cyan[100],
    },
    warning:{
      main: orange[400]
    }
  },
});

const buttonTheme = createTheme({
  palette: {
    primary: {
      main: pink[100],
    },
  },
});

export default function ActivityComponent() {
    const navigate = useNavigate();

    const style = { 
      border: '1px solid rgba(0, 0, 0, 0.1)',
      width: '20rem',
      padding: '1rem'
    };
    const style2 = { 
      padding: '1rem'
    };

    return (
        <div className="box" style={style}>
            <Stack direction="column">
              <div style={style2} onClick={() => navigate('/activitypage')}> 
                <h3> Activity name </h3> 
                <Stack direction="row" spacing={1}>
                <ThemeProvider theme={tagTheme}>
                  <Chip color="secondary" label="type"/>
                  <Chip color="primary" label="一次性"/>
                </ThemeProvider>
                </Stack>
                <p>  📅：2024/07/01 </p>
                <p> 📍：台大校園 </p>
                <p> 參加者 </p>
                <Avatar alt="Remy Sharp"/>
              </div>
              <ThemeProvider theme={buttonTheme}>
                <Button variant="contained" color="primary"> 參加 </Button> 
              </ThemeProvider>
            </Stack>
        </div>
    );
}
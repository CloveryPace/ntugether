// 活動完整資訊

import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { cyan, yellow, orange } from '@mui/material/colors';
import { Divider, Grid, Paper } from "@material-ui/core";
import TextField from "@mui/material/TextField";
import { Typography} from '@mui/material';

import theme from '../components/Theme'; 
import HeaderBar from '../components/HeaderBar';

import './Common.css';

function ActivityPage() {
  const style2 = { 
    padding: "1rem 0 0 0" 
  };
  const instyle = { 
    padding: "3rem 0 0 0" 
  };

  return (
    <ThemeProvider theme={theme}>
      <HeaderBar />
      <div className='Main'>
      <Stack direction="row" spacing={2}>
        <Typography variant="h4">活動名稱</Typography>
        <Chip avatar={<Avatar>M</Avatar>} label="創建者 名稱" />
        <Chip sx={{ bgcolor: theme.palette.hashtag.oneTime}} label="一次性"/>
        <Chip sx={{ bgcolor: theme.palette.hashtag.review}} label="需審核"/>
        <Chip sx={{ bgcolor: theme.palette.hashtag.type}} label="type"/>
        <Button variant="contained" color="primary"> 編輯活動 </Button> 
      </Stack>

      <Stack direction="row" spacing={1.5} style={style2}>
        <Typography variant="h6"> 活動簡介 </Typography>
      </Stack>

      <Stack direction="row" spacing={10} style={style2}>
        <Stack direction="column" spacing={3} style={instyle}>
          <Stack direction="row" spacing={10} style={style2}> 
            <Typography variant="h6"> 活動時間 </Typography>
          </Stack>
          <Stack direction="row" spacing={6} style={style2}> 
            <Typography variant="h6"> 活動地點 </Typography>
          </Stack>
          <Stack direction="row" spacing={6} style={style2}> 
            <Typography variant="h6"> 人數上限 </Typography>
          </Stack>
          <Stack direction="row" spacing={7} style={style2}> 
            <Typography variant="h6"> 參加者 </Typography>
          </Stack>
          <Stack direction="row" spacing={7} style={style2}> 
            <Typography variant="h6"> 討論串 </Typography>
          </Stack>
        </Stack>
        <Stack direction="column" spacing={3} style={instyle}>
          <Stack direction="row" spacing={10} style={style2}> 
            <Typography variant="h6"> 2024/01/01 20:00 </Typography>
          </Stack>
          <Stack direction="row" spacing={10} style={style2}> 
            <Typography variant="h6"> 台大門口 </Typography>
          </Stack>
          <Stack direction="row" spacing={10} style={style2}> 
            <Typography variant="h6"> 5 </Typography>
          </Stack>
          <Stack direction="row" spacing={7} style={style2}> 
          <Avatar alt="Remy Sharp"/>
          </Stack>
          <Paper style={{ padding: "30px 30px", width: "50rem" }}>
            <Grid container wrap="nowrap" spacing={2}>
              <Grid item>
                <Avatar alt="Remy Sharp"/>
              </Grid>
              <Grid justifyContent="left" item xs zeroMinWidth>
                <h4 style={{ margin: 0, textAlign: "left" }}> name </h4>
                <p style={{ textAlign: "left" }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                  luctus ut est sed faucibus. Duis bibendum ac ex vehicula laoreet.
                  Suspendisse congue vulputate lobortis. Pellentesque at interdum
                  tortor. Quisque arcu quam, malesuada vel mauris et, posuere
                  sagittis ipsum. Aliquam ultricies a ligula nec faucibus.{" "}
                </p>
              </Grid>
            </Grid>
          <Divider variant="fullWidth" style={{ margin: "20px 0" }} />
            <Grid container wrap="nowrap" spacing={2}>
                <Grid item>
                  <Avatar alt="Remy Sharp"/>
                </Grid>
                <Grid justifyContent="left" item xs zeroMinWidth>
                  <h4 style={{ margin: 0, textAlign: "left" }}> name </h4>
                  <p style={{ textAlign: "left" }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                    luctus ut est sed faucibus. Duis bibendum ac ex vehicula laoreet.
                    Suspendisse congue vulputate lobortis. Pellentesque at interdum
                    tortor. Quisque arcu quam, malesuada vel mauris et, posuere
                    sagittis ipsum. Aliquam ultricies a ligula nec faucibus.{" "}
                  </p>
                </Grid>
            </Grid>
          <Divider variant="fullWidth" style={{ margin: "10px 0" }} />
            <Grid container wrap="nowrap" spacing={2}>
                <Grid item>
                  <Avatar alt="Remy Sharp"/>
                </Grid>
                <Grid justifyContent="left" item xs zeroMinWidth>
                  <h4 style={{ margin: 0, textAlign: "left" }}> name </h4>
                  <TextField
                    fullWidth
                    variant="outlined"
                    sx={{ mt: 1}}
                    autoFocus
                    label="Add comment"
                  />
                </Grid>
            </Grid>
          </Paper>   
        </Stack>
      </Stack>

      <div style={instyle}>
      </div>
      </div>
    </ThemeProvider>
  );
}

export default ActivityPage;
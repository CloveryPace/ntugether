// 活動完整資訊

import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { ThemeProvider } from '@mui/material/styles';
import { Divider, Grid, Paper } from "@material-ui/core";
import TextField from "@mui/material/TextField";
import { Typography} from '@mui/material';
import { useState } from "react";
import theme from '../components/Theme'; 
import HeaderBar from '../components/HeaderBar';

import Box from '@mui/material/Box';

import './Common.css';

function ActivityPage() {
  const [attend, setAttend] = useState(false); // 參加活動
  const handleAttend = () => {
    setAttend(true);
    alert("參加成功");
  };
  const handleQuit = () => {
    setAttend(false);
    alert("退出成功");
  };

  window.scrollTo(0, 0); //讓進入畫面在上方
  const subtitle = { 
    width: "150px" 
  };
  const container = { 
    display: "flex" 
  };

  const discussion = {
    display: 'flex',
    '@media (max-width: 600px)': {
      display: 'block',
    },
  }

  return (
    <ThemeProvider theme={theme}>
      <HeaderBar />
      <div className='Main'>
      <Box
      sx={{
        display: 'none', 
        marginBottom: '20px',
        '@media (min-width: 900px)': {
          display: 'block', 
        }
      }}
    >
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <Stack direction="row" spacing={3}>
            <Typography variant="h4">活動名稱</Typography>
            <Chip avatar={<Avatar>M</Avatar>} label="創建者 名稱" />
            <Chip sx={{ bgcolor: theme.palette.hashtag.oneTime}} label="一次性"/>
            <Chip sx={{ bgcolor: theme.palette.hashtag.review}} label="需審核"/>
            <Chip sx={{ bgcolor: theme.palette.hashtag.type}} label="type"/>
          </Stack>
          <Button variant="contained" color="primary"> 編輯活動 </Button> 
        </Stack>
      </Box>
      <Box
        sx={{
          display: 'block', 
          marginBottom: '20px',
          '@media (min-width: 900px)': {
            display: 'none', 
          }
        }}
      >
        <Stack direction="row" spacing={2} justifyContent="space-between"         
          sx={{
              marginBottom: '10px'
        }}>
          <Typography variant="h4">活動名稱</Typography>
          <Button variant="contained" color="primary"> 編輯活動 </Button> 
        </Stack>
        <Stack direction="row" spacing={3}>
          <Chip avatar={<Avatar>M</Avatar>} label="創建者 名稱" />
          <Chip sx={{ bgcolor: theme.palette.hashtag.oneTime}} label="一次性"/>
          <Chip sx={{ bgcolor: theme.palette.hashtag.review}} label="需審核"/>
          <Chip sx={{ bgcolor: theme.palette.hashtag.type}} label="type"/>
        </Stack>
      </Box>

      <div style={container}>
        <div style={subtitle}><Typography variant="h6"> 活動簡介 </Typography></div>
        <div><Typography variant="h6"> xxxxx </Typography></div>
      </div>

      <div style={container}>
        <div style={subtitle}><Typography variant="h6"> 活動時間 </Typography></div>
        <div><Typography variant="h6"> 2024/01/01 20:00 </Typography></div>
      </div>

      <div style={container}>
        <div style={subtitle}><Typography variant="h6"> 活動簡介 </Typography></div>
        <div><Typography variant="h6"> xxxxx </Typography></div>
      </div>

      <div style={container}>
        <div style={subtitle}><Typography variant="h6"> 人數上限 </Typography></div>
        <div><Typography variant="h6"> 5 </Typography></div>
      </div>

      <div style={container}>
        <div style={subtitle}><Typography variant="h6"> 參加者 </Typography></div>
        <div style={{alignSelf: 'center'}}><Avatar alt="Remy Sharp"/></div>
      </div>

      <Box
      sx={{
        display: 'flex',
        '@media (max-width: 600px)': {
          display: 'block', 
        },
      }}
      >
        <div style={subtitle}><Typography variant="h6"> 討論串 </Typography></div>
          <Paper style={{ padding: "30px 30px", width: "100%" }}>
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
                    Aliquam ultricies a ligula nec faucibus.{" "}
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
                    Suspendisse congue vulputate lobortis.Quisque arcu quam, malesuada vel mauris et, posuere
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
                    label="Add comment"
                  />
                </Grid>
            </Grid>
          </Paper>   
      </Box>
      <Typography variant="h4"></Typography>
      <Grid container justifyContent="center">
        <Grid item>
          <Stack direction="row" spacing={2}>
          { 
            attend? 
            <Button variant="contained" type="submit" color="warning" onClick={handleQuit}> 退出活動 </Button> :
            <Button variant="contained" type="submit" color="primary" onClick={handleAttend}> 參加活動 </Button>
          }  
          </Stack>
        </Grid>
      </Grid>
    </div>
    </ThemeProvider>
  );
}

export default ActivityPage;
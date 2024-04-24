// 計畫完整資訊

import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { ThemeProvider } from '@mui/material/styles';
import { Divider, Grid, Paper } from "@material-ui/core";
import TextField from "@mui/material/TextField";
import { Typography} from '@mui/material';

import theme from '../components/Theme'; 
import HeaderBar from '../components/HeaderBar';

import Box from '@mui/material/Box';
import MyProgress from '../components/MyProgress';
import ProgressAttendee from '../components/ProgressAttendee';

import './Common.css';

function PlanPage() {
  window.scrollTo(0, 0); //讓進入畫面在上方
  const subtitle = { 
    width: "160px" 
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
            <Typography variant="h4">計畫名稱</Typography>
            <Chip avatar={<Avatar>M</Avatar>} label="創建者 名稱" />
            <Chip sx={{ bgcolor: theme.palette.hashtag.oneTime}} label="一次性"/>
            <Chip sx={{ bgcolor: theme.palette.hashtag.review}} label="需審核"/>
            <Chip sx={{ bgcolor: theme.palette.hashtag.type}} label="type"/>
          </Stack>
          <Button variant="contained" color="primary"> 編輯計畫 </Button> 
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
          <Typography variant="h4">計畫名稱</Typography>
          <Button variant="contained" color="primary"> 編輯計畫 </Button> 
        </Stack>
        <Stack direction="row" spacing={3}>
          <Chip avatar={<Avatar>M</Avatar>} label="創建者 名稱" />
          <Chip sx={{ bgcolor: theme.palette.hashtag.oneTime}} label="一次性"/>
          <Chip sx={{ bgcolor: theme.palette.hashtag.review}} label="需審核"/>
          <Chip sx={{ bgcolor: theme.palette.hashtag.type}} label="type"/>
        </Stack>
      </Box>

      <div style={container}>
        <div style={subtitle}><Typography variant="h6"> 計畫目標 </Typography></div>
        <div><Typography variant="h6"> xxxxx </Typography></div>
      </div>

      <div style={container}>
        <div style={subtitle}><Typography variant="h6"> 計畫介紹 </Typography></div>
        <div><Typography variant="h6"> xxxxx </Typography></div>
      </div>

      <div style={container}>
        <div style={subtitle}><Typography variant="h6"> 計畫時間 </Typography></div>
        <div><Typography variant="h6"> 2024/04/01 - 2024/04/31 </Typography></div>
      </div>

      <div style={container}>
        <div style={subtitle}><Typography variant="h6"> 參加者 </Typography></div>
        <div style={{alignSelf: 'center'}}><Avatar alt="Remy Sharp"/></div>
      </div>

      <Box
      sx={{
        display: 'flex',
        mb: '20px',
        mt: '20px',
        '@media (max-width: 600px)': {
          display: 'block', 
        },
      }}
      >
        <div style={subtitle}><Typography variant="h6"> 我的進度 </Typography></div>
        <div style={{ flexGrow: 1 }}><MyProgress/></div>
      </Box>

      <Box
      sx={{
        display: 'flex',
        mb: '20px',
        mt: '20px',
        '@media (max-width: 600px)': {
          display: 'block', 
        },
      }}
      >
        <div style={subtitle}><Typography variant="h6"> 參加者的進度 </Typography></div>
        <ProgressAttendee />
      </Box>

      <Box
      sx={{
        display: 'flex',
        mb: '20px',
        mt: '20px',
        '@media (max-width: 600px)': {
          display: 'block', 
        },
      }}
      >
        <div style={subtitle}><Typography variant="h6"> 討論串 </Typography></div>
        <div style={{ flexGrow: 1 }}>
          <Paper style={{ padding: "30px 30px", width: '100%', boxSizing: 'border-box'}}>
            <Grid container wrap="nowrap" spacing={2}>
              <Grid item>
                <Avatar alt="Remy Sharp"/>
              </Grid>
              <Grid justifyContent="left" item xs>
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
                <Grid justifyContent="left" item xs >
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
                <Grid justifyContent="left" item xs >
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
                <Grid justifyContent="left" item xs>
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
          </div>   
      </Box>

    </div>
    </ThemeProvider>
  );
}

export default PlanPage;
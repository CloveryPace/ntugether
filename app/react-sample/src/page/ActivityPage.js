// 活動完整資訊

import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { ThemeProvider } from '@mui/material/styles';
import { Typography} from '@mui/material';
import PendingReview from '../components/PendingReview';
import CommentsBox from '../components/CommentsBox';
import theme from '../components/Theme'; 
import HeaderBar from '../components/HeaderBar';
import Box from '@mui/material/Box';
import './Common.css';

function ActivityPage() {
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

      <br/>
      <br/>

      <div style={container}>
        <div style={subtitle}><Typography variant="h6"> 加入審核 </Typography></div>
        <div><PendingReview/></div>
      </div>
      
      <br/>
      <br/>

      <CommentsBox/>

    </div>
    </ThemeProvider>
  );
}

export default ActivityPage;
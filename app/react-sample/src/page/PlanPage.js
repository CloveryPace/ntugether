// 計畫完整資訊

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { getAuthToken } from '../utils'; // 自定義的 token 獲取函數
import { API_GET_USER, API_GET_PLAN_DETAIL } from '../global/constants'; // API 常數
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { ThemeProvider } from '@mui/material/styles';
import { Divider, Grid, Paper } from "@material-ui/core";
import TextField from "@mui/material/TextField";
import { Typography } from '@mui/material';

import theme from '../components/Theme';
import HeaderBar from '../components/HeaderBar';
import Box from '@mui/material/Box';
import MyProgress from '../components/MyProgress';
import ProgressAttendee from '../components/ProgressAttendee';
import { useTranslation } from 'react-i18next';
import ReviewBoxForPlan from '../components/ReviewBoxForPlan';
import CommentsBoxForPlan from '../components/CommentsBoxForPlan';
import './Common.css';

function PlanPage() {
  window.scrollTo(0, 0); //讓進入畫面在上方
  const { t, i18n } = useTranslation();
  const { state } = useLocation();
  const { id } = state; // 取得路由傳遞的計畫 ID
  const [data, setData] = useState([]);
  const [userToken, setUserToken] = useState(getAuthToken());
  const [userId, setUserId] = useState('');
  const [creatorId, setCreatorId] = useState('');
  const [atendee, setAtendee] = useState([]);
  const [attend, setAttend] = useState(false);
  const [editingShow, setEditingShow] = useState(false);


  useEffect(() => {
    // 儲存 token
    const token = userToken;
    // 設定 authorization
    const config = {
      headers: {
        authorization: `Bearer ${token}`
      }
    };

    // 取得使用者 ID
    axios.get(API_GET_USER, config)
      .then(res => {
        setUserId(res.data.members['user_id']);
        console.log("userId:", res.data.members['user_id']);
      })
      .catch(err => {
        console.log(err);
        alert("error");
      });

    // 取得計畫資訊
    axios.get(API_GET_PLAN_DETAIL + id, config)
    .then(res => {
      const formattedData = {
        ...res.data,
        start_date: res.data.start_date ? new Date(res.data.start_date).toISOString().split('T')[0] : '',
        end_date: res.data.end_date ? new Date(res.data.end_date).toISOString().split('T')[0] : ''

      };
      setData(formattedData);
      setCreatorId(res.data.created_user_id);
    })
      .catch(err => {
        console.log(err);
        alert("error");
      });

    /*
    // 取得參加者
    axios.get(API_GET_PLAN_DETAIL + id + '/participants', config)
      .then(res => {
        setAttendees(res.data);
      })
      .catch(err => {
        console.log(err);
        alert("error");
      });
    */
  }, [id]);

  const handleAttend = () => {
    const token = userToken;
    const config = {
      headers: { "authorization": `Bearer ${token}` }
    };
    const url = data.need_review ? `${API_GET_PLAN_DETAIL + id}apply` : `${API_GET_PLAN_DETAIL + id}/apply`;

    axios.post(url, {}, config)
      .then(res => {
        console.log(res);
        setAttend(true);
        alert(data.need_review ? '已送出申請' : '已加入');
      })
      .catch(err => {
        alert(data.need_review ? "送出失敗" : "加入失敗");
        console.log(err);
      });
  };

  const handleQuit = () => {
    setAttend(false);
    alert("退出成功");
  };

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
              <Typography variant="h4">{data.name ? data.name : "計畫名稱"}</Typography>
              <Chip avatar={<Avatar>{data.Creator ? data.Creator.name[0] : "M"}</Avatar>} label={data.Creator ? data.Creator.name : "創建者 名稱"} />
              <Chip sx={{ bgcolor: theme.palette.hashtag.review }} label={t(data.need_reviewed ? "需審核" : "不需審核")} />
              <Chip sx={{ bgcolor: theme.palette.hashtag.type }} label={t(data.type ? data.type : "type")} />
            </Stack>
            {userId === creatorId &&
              <Button variant="contained" color="primary"> {t('編輯計畫')} </Button>
            }
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
            <Typography variant="h4">{data.name ? data.name : "計畫名稱"}</Typography>
            {userId === creatorId &&
              <Button variant="contained" color="primary"> {t('編輯計畫')} </Button>
            }
          </Stack>
          <Stack direction="row" spacing={3}>
            <Chip avatar={<Avatar>{data.Creator ? data.Creator.name[0] : "M"}</Avatar>} label={data.Creator ? data.Creator.name : "創建者 名稱"} />
            <Chip sx={{ bgcolor: theme.palette.hashtag.review }} label={t(data.need_reviewed ? "需審核" : "不需審核")} />
            <Chip sx={{ bgcolor: theme.palette.hashtag.type }} label={t(data.type ? data.type : "type")} />
          </Stack>
        </Box>

        <div style={container}>
          <div style={subtitle}><Typography variant="h6"> {t('計畫目標')} </Typography></div>
          <div><Typography variant="h6"> {data.goal ? data.goal : "尚無計畫目標"} </Typography></div>
        </div>

        <div style={container}>
          <div style={subtitle}><Typography variant="h6"> {t('計畫介紹')} </Typography></div>
          <div><Typography variant="h6"> {data.introduction ? data.introduction : "尚無計畫介紹"} </Typography></div>
        </div>

        <div style={container}>
          <div style={subtitle}><Typography variant="h6"> {t('開始日期')} </Typography></div>
          <div><Typography variant="h6"> {data.start_date ? data.start_date : "尚無開始日期"} </Typography></div>
        </div>

        <div style={container}>
          <div style={subtitle}><Typography variant="h6"> {t('結束日期')} </Typography></div>
          <div><Typography variant="h6"> {data.end_date ? data.end_date : "尚無結束日期"} </Typography></div>
        </div>

        <div style={container}>
        <div style={subtitle}><Typography variant="h6"> {t("參加者")} </Typography></div>
        {atendee.length > 0 ?
            (atendee.map((person) => {
              return (
                <div style={{alignSelf: 'center'}}>
                  <Chip avatar={<Avatar>{person.participants? person.participants: "未知"}</Avatar>} label={person.participants? person.participants: "未知"} />
                </div>
              );
            })):
          <div style={{alignSelf: 'center'}}>
              尚無參加者
          </div>
        }
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
          <div style={subtitle}><Typography variant="h6"> {t('我的進度')} </Typography></div>
          <div style={{ flexGrow: 1 }}><MyProgress /></div>
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
          <div style={subtitle}><Typography variant="h6"> {t('參加者進度')} </Typography></div>
          <ProgressAttendee />
        </Box>

        <CommentsBoxForPlan id={id}/>

        <br/>
        <br/>
        
        <Grid container justifyContent="center">
          <Grid item>
            {attend ?
              <Button variant="contained" color="warning" onClick={handleQuit}> {t("退出計畫")} </Button> :
              <ReviewBoxForPlan id={id} question={data.application_problem} need_reviewed={data.need_reviewed} attendfuction={handleAttend} />
            }
          </Grid>
        </Grid>

      </div>
    </ThemeProvider>
  );
}

export default PlanPage;
// 活動完整資訊
import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { ThemeProvider } from '@mui/material/styles';
import { Typography} from '@mui/material';
import PendingReview from '../components/PendingReview';
import CommentsBox from '../components/CommentsBox';
import theme from '../components/Theme'; 
import HeaderBar from '../components/HeaderBar';
import ReviewBox from '../components/ReviewBox';
import Box from '@mui/material/Box';
import './Common.css';
import EditActivityPage from './EditActivityPage'; 
import {useLocation} from 'react-router-dom';
import { API_GET_USER, API_GET_ACTIVITY_DETAIL } from '../global/constants';
import axios from 'axios';
import { useEffect } from 'react';
import { getAuthToken } from '../utils';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';

// 頭像顏色根據名字變化
function stringToColor(string) {
  let hash = 0;
  let i;
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
}
function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name[0]}`,
  };
}

function ActivityPage() {
  const { t, i18n } = useTranslation();
  const { state } = useLocation();
  const { id } = state; // Read values passed on state
  const [data, setData] = useState([]);
  const [userId, setUserId] = useState('');
  const [creatorId, setCreatorId] = useState('');
  const [atendee, setAtendee] = useState([]);
  const [attend, setAttend] = useState(false); // 是否已參加活動

  useEffect(() => {
    //儲存token
    const token = getAuthToken();
    //設定authorization
    const config = {
        headers: { 
          authorization: `Bearer ${token}`
        }
    };
    console.log(token);

    //取得活動資訊
    axios.get(API_GET_ACTIVITY_DETAIL + id, config)
      .then(function (res) {
        console.log("取得活動資訊");
        console.log(res.data);
        setData(res.data);
        setCreatorId(res.data.created_user_id);
        setAtendee(res.data.Participants);
        //取得使用者id
        axios.get(API_GET_USER, config)
          .then(function (response) {
            setUserId(response.data.members.user_id);
            for (var i = 0; i < res.data.Participants.length; i++){
              if( response.data.members.user_id === res.data.Participants[i].user_id ){
                // 是否已經在參加者名單
                setAttend(true);
              }
            }
          })
          .catch(function (err) {
            console.log(err);
            alert("error");
          });
        })
      .catch(function (err) {
        console.log(err);
        alert("error");
    });

    }, [id]);


  const [editingShow, setEditingShow] = useState(false);

  const handleQuit = () => {
    const token = getAuthToken();
    const config = {
        headers: { 
          authorization: `Bearer ${token}`
        }
    };
    axios.delete(API_GET_ACTIVITY_DETAIL + id + '/leave', config)
      .then(function (res) {
          setAttend(false);
          alert("退出成功");
          window.location.reload(false);
        })
      .catch(function (err) {
        console.log(err);
        alert("error");
    });
  };

  window.scrollTo(0, 0); //讓進入畫面在上方
  const subtitle = { 
    width: "150px" 
  };
  const container = { 
    display: "flex" 
  };

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
            <Typography variant="h4">{data.name? data.name: "未命名活動名稱"}</Typography>
            <Chip avatar={<Avatar>{data.Creator? data.Creator.name[0]: "未知建立者"}</Avatar>} label={data.Creator? data.Creator.name: "未知建立者"} />
            <Chip sx={{ bgcolor: theme.palette.hashtag.oneTime}} label={t(data.is_one_time? "一次性活動": "長期性活動")}/>
            <Chip sx={{ bgcolor: theme.palette.hashtag.review}} label={t(data.need_reviewed? "需審核": "不需審核")}/>
            <Chip sx={{ bgcolor: theme.palette.hashtag.type}} label={t(data.type? data.type: "未指定")}/>
            <Chip sx={{ bgcolor: theme.palette.hashtag.type}} label={"ID: " + id}/>
          </Stack>
          {(userId === creatorId)? 
            <>
            <Button variant="contained" color="primary" onClick={() => setEditingShow(true)}> {t("編輯活動")} </Button>
            </>
            :
            <p></p>
          }
        </Stack>
        {editingShow &&
          <EditActivityPage /** 編輯視窗 */
            show={editingShow}
            onHide={() => setEditingShow(false)}
            data={data}
            id={id}
          />
          }
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
          <Typography variant="h4">{t(data.name? data.name: "未命名活動名稱")}</Typography>
          {(userId === creatorId)? 
            <>
            <Button variant="contained" color="primary" onClick={() => setEditingShow(true)}> {t("編輯活動")} </Button>
            </>
            :
            <p></p>
          }
        </Stack>
        <Stack direction="row" spacing={3}>
          <Chip avatar={<Avatar>{data.Creator? data.Creator.name[0]: "M"}</Avatar>} label={t(data.Creator? data.Creator.name: "未知建立者")} />
          <Chip sx={{ bgcolor: theme.palette.hashtag.oneTime}} label={t(data.is_one_time? "一次性活動": "長期性活動")}/>
          <Chip sx={{ bgcolor: theme.palette.hashtag.review}} label={t(data.need_reviewed? "需審核": "不需審核")}/>
          <Chip sx={{ bgcolor: theme.palette.hashtag.type}} label={t(data.type? data.type: "未指定")}/>
        </Stack>
      </Box>

      <div style={container}>
        <div style={subtitle}><Typography variant="h6"> {t("活動簡介")} </Typography></div>
        <div><Typography variant="h6"> {data.introduction? data.introduction: "尚無活動簡介"} </Typography></div>
      </div>

      <div style={container}>
        <div style={subtitle}><Typography variant="h6"> {t("活動時間")} </Typography></div>
        <div>
        {Array.isArray(data.date)?
            (data.date.map((D) => {
              return (
                <Typography variant="h6"> {D? dayjs(D).format('YYYY/MM/DD h:mm A'): "尚無活動時間資料"} </Typography>
              );
            }))
            :
            <Typography variant="h6"> {data.date? dayjs(data.date).format('YYYY/MM/DD h:mm A'): "尚無活動時間資料"}  </Typography>
        }
        </div>
      </div>

      <div style={container}>
        <div style={subtitle}><Typography variant="h6"> {t("活動地點")} </Typography></div>
        <div><Typography variant="h6"> {data.location? data.location: "尚無活動地點資料"} </Typography></div>
      </div>

      <div style={container}>
        <div style={subtitle}><Typography variant="h6"> {t("人數上限")} </Typography></div>
        <div><Typography variant="h6"> {data.max_participants? data.max_participants: "尚無人數上限"} </Typography></div>
      </div>

      <div style={container}>
        <div style={subtitle}>
          <Typography variant="h6"> {t("參加者")} </Typography>
        </div>
        {atendee.length > 0 ?
            (atendee.map((person) => {
              return (
                <div style={{alignSelf: 'center'}}>
                  <Chip avatar={<Avatar {...stringAvatar(person.name? person.name: "未知")}/>} label={person.name? person.name: "未知"} />
                </div>
              );
            }))
            :
          <div style={{alignSelf: 'center'}}>
              尚無參加者
          </div>
        }
      </div>
      <br/>
      <br/>


      {(data.need_reviewed && (userId === creatorId))?
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
          <div style={subtitle}><Typography variant="h6"> {t("加入審核")} </Typography></div>
          <div><PendingReview id={id}/></div>
          </Box>
        :
        <></>
      }
 
      
      <br/>
      <br/>

      <CommentsBox id={id}/>

      <br/>
      <br/>
      
      <Grid container justifyContent="center">
        <Grid item>
          {((userId !== creatorId) && (!attend))?
            <ReviewBox id={id} question={data.application_problem? data.application_problem: ""} need_reviewed={data.need_reviewed}/>
            :
            <></>
          }
          {((userId !== creatorId) && attend)?
            <Button variant="contained" color="warning" onClick={handleQuit}> {t("退出活動")} </Button>
            :
            <></>
          }
      </Grid>
      </Grid>

    </div>
    </ThemeProvider>
  );
}

export default ActivityPage;
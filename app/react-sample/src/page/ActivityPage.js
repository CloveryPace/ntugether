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

function ActivityPage() {
  const { t, i18n } = useTranslation();
  const { state } = useLocation();
  const { id } = state; // Read values passed on state
  const [data, setData] = useState([]);
  const [userToken, setUserToken] = useState(getAuthToken());
  const [userId, setUserId] = useState('');
  const [creatorId, setCreatorId] = useState('');
  const [atendee, setAtendee] = useState([]);

  useEffect(() => {
        //儲存token
        const token = userToken;
        //設定authorization
        const config = {
            headers: { 
              authorization: `Bearer ${token}`
            }
        };

        //取得使用者id
        axios.get(API_GET_USER, config)
          .then(function (res) {
            setUserId(res.data.members['user_id']);
            console.log("userId");
            console.log(res.data.members['user_id']);
          })
          .catch(function (err) {
            console.log(err);
            alert("error");
          });

        //取得活動資訊
        axios.get(API_GET_ACTIVITY_DETAIL + id, config)
          .then(function (res) {
            console.log(res.data);
            setData(res.data);
            console.log("creatorId")
            console.log(res.data.created_user_id);
            setCreatorId(res.data.created_user_id);
          })
          .catch(function (err) {
            console.log(err);
            alert("error");
          });

        /*
        //取得參加者
        axios.get(API_GET_ACTIVITY_DETAIL + id + '/participants', config)
          .then(function (res) {
            console.log("取得參加者成功");
            setAtendee(res.data);
            console.log(res.data);
          })
          .catch(function (err) {
            console.log("取得參加者出現錯誤");
            console.log(err);
            alert("error");
          });
          */

      }, [id]);


  const [editingShow, setEditingShow] = useState(false);
  const [attend, setAttend] = useState(false); // 參加活動
  const handleAttend = () => {
    if(data.need_review){
      //儲存token
      const token = userToken;
      console.log(token);
      //設定authorization
      const bodyParameters = {
        key: "value",
      };
      const config = {bodyParameters,
          headers: { "authorization": `Bearer ${token}`}
      };

      //送加入申請
      axios.post(API_GET_ACTIVITY_DETAIL + id + 'apply', config)
        .then(function (res) {
            console.log(res);
            setAttend(true);
            alert('已送出申請');
        })
        .catch(function (err) {
            alert("送出失敗");
            console.log(err);
      });
      
    }
    else{
      //儲存token
      const token = userToken;
      console.log(token);
      //設定authorization
      const bodyParameters = {
        key: "value",
      };
      const config = {bodyParameters,
          headers: { "authorization": `Bearer ${token}`}
      };

      //送加入申請
      axios.post(API_GET_ACTIVITY_DETAIL + id + '/apply', config)
        .then(function (res) {
            console.log(res);
            setAttend(true);
            alert('已加入');
        })
        .catch(function (err) {
            alert("加入失敗");
            console.log(err);
      });
      }
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
            name={data.name? data.name: ""}
            introduction={data.introduction? data.introduction: ""}
            date={data.date? data.date: ""}
            location={data.location? data.location: ""}
            max_participants={data.max_participants? data.max_participants: ""}
            ActivityAtendee=""
            oneTime={data.is_one_time? data.is_one_time: ""}
            need_reviewed={data.need_reviewed? data.need_reviewed: ""}
            type={data.type? data.type: "未指定"}
            id={id}
            application_problem={data.application_problem? data.application_problem: ""}
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
          <Chip avatar={<Avatar>M</Avatar>} label={t(data.Creator? data.Creator.name: "未知建立者")} />
          <Chip sx={{ bgcolor: theme.palette.hashtag.oneTime}} label={t(data.is_one_time? "一次性活動": "長期性活動")}/>
          <Chip sx={{ bgcolor: theme.palette.hashtag.review}} label={t(data.need_review? "需審核": "不需審核")}/>
          <Chip sx={{ bgcolor: theme.palette.hashtag.type}} label={t(data.type? data.type: "未指定")}/>
        </Stack>
      </Box>

      <div style={container}>
        <div style={subtitle}><Typography variant="h6"> {t("活動簡介")} </Typography></div>
        <div><Typography variant="h6"> {data.introduction? data.introduction: "尚無活動簡介"} </Typography></div>
      </div>

      <div style={container}>
        <div style={subtitle}><Typography variant="h6"> {t("活動時間")} </Typography></div>
        <div><Typography variant="h6"> {data.date? data.date: "尚無活動時間資料"} </Typography></div>
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

      <br/>
      <br/>


      {(data.need_review? "需審核":"不需審核") === "需審核"?
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
        {attend?
          <Button variant="contained" color="warning" onClick={handleQuit}> {t("退出活動")} </Button>:
          <ReviewBox id={id} question={data.application_problem? data.application_problem: ""} need_reviewed={data.need_reviewed} attendfuction={handleAttend}/>
        }
      </Grid>
      </Grid>

    </div>
    </ThemeProvider>
  );
}

export default ActivityPage;
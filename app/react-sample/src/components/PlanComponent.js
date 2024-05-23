// 進度計畫資訊方塊 

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ScheduleIcon from '@mui/icons-material/Schedule';
import PeopleIcon from '@mui/icons-material/People';
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { API_CREATE_PLAN } from '../global/constants';
import { getAuthToken } from '../utils';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import theme from '../components/Theme';
import { API_GET_USER, API_GET_PLAN_DETAIL } from '../global/constants'; // API 常數

export default function PlanComponent({data, key}) {

  const { t, i18n } = useTranslation();


  const [userToken, setUserToken] = useState(getAuthToken());
  const navigate = useNavigate();
    const style = { 
      border: '1.5px solid rgba(0, 0, 0, 0.1)',
      padding: '2rem',
      cursor: 'pointer'
    };

// TODO: navigate到特定活動頁面（參數：ID）
useEffect(() => {


      const token = userToken;

      const config = {
          headers: { 
            authorization: `Bearer ${token}`
          }
      };

      //取得計畫列表
      axios.get(API_CREATE_PLAN, config, key)
        .then(function (res) {
          console.log(res.data);
        })
        .catch(function (err) {
          console.log(err);
          alert("error");
        });

    // })
    // .catch(function (error) {
    //     console.log(error);
    // });
  }, [key]);
  
  const formatDate = (date) => {
    return date ? new Date(date).toISOString().split('T')[0] : '';
  };

    return (
        <Grid item xs={12} md={4}>
        <div className="box" style={style}>
          <Stack direction="column">
          <div onClick={() => navigate(`/planPage`, { state: {id: data.plan_id } })} style={{cursor: 'pointer'}}>
            <Typography variant="h5" gutterBottom>{data.name? data.name: "未命名計畫"}</Typography>
              <Stack direction="row" spacing={1}>
                <Chip sx={{ bgcolor: theme.palette.hashtag.review }} label={t(data.need_reviewed ? "需審核" : "不需審核")} />
                <Chip sx={{ bgcolor: theme.palette.hashtag.type }} label={t(data.PlanTypes ? data.PlanTypes[0].typeName : "未指定")} />
              </Stack >

              <Stack direction="column" spacing={2} sx={{ marginTop: '20px', marginBottom: '20px'}}>
                 <div style={{ display: "flex", alignItems: "center" }}>
                 <Typography variant="body1">目標：</Typography>
                  <Typography variant="body1">{data.goal? data.goal: "尚未設定目標"}</Typography>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <ScheduleIcon color="icon" sx={{ paddingRight: '10px'}} />
                  <Typography variant="body1">{formatDate(data.start_date) || "尚未設定開始日期"}</Typography>
                  <Typography variant="body1"> - </Typography>
                  <Typography variant="body1">{formatDate(data.end_date) ||  "尚未設定結束日期"}</Typography>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <PeopleIcon color="icon" sx={{ paddingRight: '10px'}}/>
                  <Avatar alt="Remy Sharp"/>
                </div>
              </Stack>

            </div>
          </Stack>
        </div>
        </Grid>
    );
}
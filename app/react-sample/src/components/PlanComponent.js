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

export default function PlanComponent({data, key}) {
  const [userToken, setUserToken] = useState(getAuthToken());
  const navigate = useNavigate();
    const style = { 
      border: '1.5px solid rgba(0, 0, 0, 0.1)',
      padding: '2rem',
      cursor: 'pointer'
    };

// TODO: navigate到特定活動頁面（參數：ID）
useEffect(() => {
  //登入
  // axios.post(API_LOGIN, {
  //   "email": "r12725066@ntu.edu.tw",
  //   "password": "a"
  // })
  // .then(function (response) {
  //     console.log(response.status, response.data);
  //     //儲存token
      const token = userToken;
  //     //設定authorization
      const config = {
          headers: { 
            authorization: `Bearer ${token}`
          }
      };
      //取得活動資訊
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
                <Chip color="secondary" label={data.type || "未指定"}/>
                <Chip color="secondary" label={data.activity_id? data.activity_id:"ID"}/>
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
// 活動資訊方塊 

import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { API_CREATE_ACTIVITY, API_LOGIN } from '../global/constants';
import ScheduleIcon from '@mui/icons-material/Schedule';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PeopleIcon from '@mui/icons-material/People';
import axios from 'axios';
import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { getAuthToken } from '../utils';

export default function ActivityComponent({data, key}) {
    const [userToken, setUserToken] = useState(getAuthToken());
    const navigate = useNavigate();
    const style = { 
      border: '1.5px solid rgba(0, 0, 0, 0.1)',
      padding: '2rem'
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
        axios.get(API_CREATE_ACTIVITY, config, key)
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

    return (
        <Grid item xs={12} md={4}>
        <div className="box" style={style}>
          <Stack direction="column">
            <div onClick={() => navigate(`/activitypage`, { state: {id: data.activity_id } })}>
            <Typography variant="h5" gutterBottom>{data.name? data.name: "未命名活動"}</Typography>
              <Stack direction="row" spacing={1}>
                <Chip color="secondary" label={data.type || "未指定"}/>
                <Chip color="secondary" label={data.oneTime? "一次性":"長期活動"}/>
                <Chip color="secondary" label={data.activity_id? data.activity_id:"ID"}/>
              </Stack >

              <Stack direction="column" spacing={2} sx={{ marginTop: '20px', marginBottom: '20px'}}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <ScheduleIcon color="icon" sx={{ paddingRight: '10px'}} />
                  <Typography variant="body1">{data.date? data.date: "未指定日期"}</Typography>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <LocationOnIcon color="icon" sx={{ paddingRight: '10px'}}/>
                  <Typography variant="body1">{data.location? data.location: "未指定地點"}</Typography>
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

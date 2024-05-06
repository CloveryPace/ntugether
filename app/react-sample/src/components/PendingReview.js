//審核區

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { API_LOGIN, API_GET_ACTIVITY_DETAIL } from '../global/constants';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import Chip from '@mui/material/Chip';

export default function PendingReview({id}) {
    const [data, setData] = useState([]);
    const style = { 
      display: "flex",
      border: '1.5px solid rgba(0, 0, 0, 0.1)',
      padding: '1rem',
      spacing: "5rem",
      direction: "row"
    };
    const component = { 
        width: "10rem",
        border: '1.5px solid rgba(0, 0, 0, 0.1)',
        padding: '1rem'
      };
      useEffect(() => {
        //登入
        async function runEffect(){
        await axios.post(API_LOGIN, {
          "email": "r12725066@ntu.edu.tw",
          "password": "a"
        })
        .then(function (response) {
            console.log(response.status, response.data);
            //儲存token
            const token = response.data.jwtToken;
            //設定authorization
            const config = {
                headers: { 
                  authorization: `Bearer ${token}`
                }
            };
            //取得申請
            axios.get(API_GET_ACTIVITY_DETAIL + id + '/application', config)
              .then(function (res) {
                console.log(res.data);
                console.log("取得審請成功");
                setData(res.data);
              })
              .catch(function (err) {
                console.log(err);
                console.log("取得審請錯誤");
              });
    
          })
          .catch(function (error) {
              console.log(error);
          });
          }
          runEffect();
      }, [id]);

    return (
        <div className="box" style={style}>
            <Stack direction="column" spacing={1}>

            {data.length > 0 ?
            (data.map((comment) => {
              return (
                <div style = {component}>
                  <Chip avatar={<Avatar>M</Avatar>} label={comment.is_approved? comment.is_approved: "未知"} />
                  <p> {comment.application_response? comment.application_response: "未回答"} </p>
                  <Button variant="contained" color="primary"> 加入 </Button> 
                  <p></p>
                  <Button variant="contained" color="primary"> 刪除 </Button> 
                </div>
              );
            })):
            <div style = {component}>
                尚無申請資料
            </div>
          }
            </Stack>
        </div>
    );
}
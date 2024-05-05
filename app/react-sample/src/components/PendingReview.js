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
      border: '1.5px solid rgba(0, 0, 0, 0.1)',
      padding: '1rem',
      spacing: "5rem"
    };
    const component = { 
        width: "40rem",
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
                    <Stack direction="row" spacing={45}>
                        <Stack direction="row" spacing={3}>
                            <Chip avatar={<Avatar>M</Avatar>} label={comment.applicant.username? comment.applicant.username: "未知"} />
                            <p> {comment.application_response? comment.application_response: "未回答"} </p>
                        </Stack>
                        <Stack direction="row" spacing={1}>
                            <Button variant="contained" color="primary"> 加入 </Button> 
                            <Button variant="contained" color="primary"> 刪除 </Button> 
                        </Stack>
                    </Stack >
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
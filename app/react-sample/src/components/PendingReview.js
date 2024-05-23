//審核區

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { API_GET_ACTIVITY_DETAIL, API_GET_APPLICATION } from '../global/constants';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import Chip from '@mui/material/Chip';
import { getAuthToken } from '../utils';

export default function PendingReview({id}) {
    const [data, setData] = useState([]);
    const [userToken, setUserToken] = useState(getAuthToken());
    const component = { 
        width: "10rem",
        border: '1.5px solid rgba(0, 0, 0, 0.1)',
        padding: '1rem'
    };
    const component_2 = { 
      width: "10rem",
      border: '1.5px solid rgba(0, 0, 0, 0)',
      padding: '1.3rem'
  };

    useEffect(() => {
      //儲存token
      const token = userToken;
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
          console.log("取得申請成功");
          setData(res.data);
        })
        .catch(function (err) {
          console.log(err);
          console.log("取得申請錯誤");
        });

    }, [id]);

    const handleApprove = (apply_id) => { 
      //儲存token
      const token = userToken;
      //設定authorization
      const config = {
          headers: { 
            authorization: `Bearer ${token}`
          }
      };
  
      //審核通過
      axios.patch(API_GET_APPLICATION + apply_id + '/approve',{ 
        "is_approved": true
      }, config)
        .then(function (res) {
            console.log(res);
            alert('審核成功');
            window.location.reload(false);
        })
        .catch(function (err) {
            alert("審核失敗");
            console.log(err);
      });
    };

    return (
      <Stack direction="column" spacing={1}>
        {data.length > 0 ?
        (data.map((comment) => {
          return (
            <div style = {component}>
              <Chip avatar={<Avatar> {comment.applicant_id? comment.applicant_id: "未知"} </Avatar>} label={comment.applicant_id? comment.applicant_id: "未知"} />
              <p> {comment.application_response? comment.application_response: "未回答"} </p>
              <Button variant="contained" color="primary" onClick={() =>handleApprove(comment.application_id)}> 加入 </Button> 
              <p></p>
              <Button variant="contained" color="primary"> 刪除 </Button> 
            </div>
          );
        })):
        <div style = {component_2}>
            尚無申請資料
        </div>
        }
      </Stack>
    );
}
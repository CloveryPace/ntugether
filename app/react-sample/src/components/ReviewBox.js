import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from "@mui/material/TextField";
import { useRef } from "react";
import { API_LOGIN, API_GET_ACTIVITY_DETAIL } from '../global/constants';
import axios from 'axios';

export default function ReviewBox({id, question, need_reviewed, attendfuction}) {
    const Answer = useRef();
    const handleSubmit = e => {
        console.log(Answer.current?.value);
    };  

    const style = { 
      border: '1.5px solid rgba(0, 0, 0, 0.1)',
      padding: '2rem'
    };

    // 參加api
    const handleAttend = () => {
      if(need_reviewed){
        axios.post(API_LOGIN, {
          "email": "r12725066@ntu.edu.tw",
          "password": "a"
        })
        .then(function (response) {
            console.log(response.status, response.data);
            //儲存token
            const token = response.data.jwtToken;
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
                  alert('已送出申請');
              })
              .catch(function (err) {
                  alert("送出失敗");
                  console.log(err);
            });
        })
        .catch(function (error) {
          // 登入中間出錯
          alert("送出失敗");
          console.log(error);
        });
      }
      else{
        // 不需審核
        axios.post(API_LOGIN, {
          "email": "r12725066@ntu.edu.tw",
          "password": "a"
        })
        .then(function (response) {
            console.log(response.status, response.data);
            //儲存token
            const token = response.data.jwtToken;
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
                  alert('已加入');
              })
              .catch(function (err) {
                  alert("加入失敗");
                  console.log(err);
            });
        })
        .catch(function (error) {
          // 登入中間出錯
          alert("參加失敗");
          console.log(error);
        });
      }
    };

    return (
      <>
      {need_reviewed?
        <div className="box" style={style}>
          <Stack direction="column" spacing={2}>
            <Typography variant="h5" gutterBottom>立即加入</Typography>
            <p> 審核題目：{question}</p>
              <TextField
                variant="outlined"
                name="reviewreply"
                label="輸入回答"
                inputRef={Answer}
                />
              <Button variant="contained" color="primary" onClick={handleSubmit}> 送出加入請求 </Button> 
          </Stack>
        </div>
      :
        <Button variant="contained" color="primary"> 參加活動 </Button>
      }
      </>
    );
}
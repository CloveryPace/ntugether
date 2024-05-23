import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from "@mui/material/TextField";
import { useRef } from "react";
import { API_GET_ACTIVITY_DETAIL } from '../global/constants';
import axios from 'axios';
import { getAuthToken } from '../utils';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function ReviewBox({id, question, need_reviewed}) {
    const { t, i18n } = useTranslation();
    const Answer = useRef();
    const [userToken, setUserToken] = useState(getAuthToken());
    const handleSubmit = e => {
        console.log(Answer.current?.value);
    };  

    const style = { 
      border: '1.5px solid rgba(0, 0, 0, 0.1)',
      padding: '2rem'
    };

    // 參加api
    const handleAttend = () => {
      const token = userToken;
      console.log(token);
      if(need_reviewed){
        if (Answer.current?.value === ""){
          alert("請輸入回答");
        }
        else {
          const bodyParameters = {
            key: "value",
          };
          const config = {bodyParameters,
              headers: { "authorization": `Bearer ${token}`}
          };
          //回答
          const response_ans = 
          {
            application_response: Answer.current?.value
          }
  
          //送加入申請
          axios.post(API_GET_ACTIVITY_DETAIL + id + '/apply', response_ans, config)
            .then(function (res) {
                console.log(res);
                alert('已送出申請');
                window.location.reload(false);
            })
            .catch(function (err) {
                alert("送出失敗");
                console.log(err);
          });
        }
      }
      else{
        // 不需審核
        //設定authorization
        const bodyParameters = {
          key: "value",
        };
        const config = {bodyParameters,
            headers: { "authorization": `Bearer ${token}`}
        };

        //送加入申請
        axios.post(API_GET_ACTIVITY_DETAIL + id + '/apply', "", config)
          .then(function (res) {
              console.log(res);
              alert('已加入');
              window.location.reload(false);
          })
          .catch(function (err) {
              console.log(err.response.data);
              if (err.response.data === "applier has already joined"){
                alert("已參加本活動");
              }
              if (err.response.data === "Activity creator should not applied."){
                alert("參加者不可加入所創辦的活動");
              }
        });
      }
    };

    return (
      <>
      {need_reviewed?
        <div className="box" style={style}>
          <Stack direction="column" spacing={2}>
            <Typography variant="h5" gutterBottom>{t("立即加入")}</Typography>
            <p> {t("審核題目")}：{question}</p>
              <TextField
                variant="outlined"
                name="reviewreply"
                label="輸入回答"
                inputRef={Answer}
                />
              <Button variant="contained" color="primary" onClick={handleAttend}> {t("送出加入請求")} </Button> 
          </Stack>
        </div>
      :
        <Button variant="contained" color="primary" onClick={handleAttend}> {t("參加活動")} </Button>
      }
      </>
    );
}
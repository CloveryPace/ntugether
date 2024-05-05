//留言板

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { Divider, Grid, Paper } from "@material-ui/core";
import TextField from "@mui/material/TextField";
import { Typography } from '@mui/material';
import { API_LOGIN, API_GET_ACTIVITY_DETAIL } from '../global/constants';
import axios from 'axios';
import { useState, useEffect } from 'react';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import { useRef } from "react";

const style = {
  margin: "0.5rem"
};

export default function CommentsBox({ id }) {
    const [data, setData] = useState([]); //留言資料
    const inputRef = useRef();

    const subtitle = { 
        width: "150px" 
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
              headers: { authorization: `Bearer ${token}`}
          };

          //取得活動留言資訊
          axios.get(API_GET_ACTIVITY_DETAIL + id + '/discussion', config)
            .then(function (res) {
              console.log(res.data);
              setData(res.data);
            })
            .catch(function (err) {
              console.log(err);
              console.log("取得留言出現錯誤");
            });
  
        })
        .catch(function (error) {
            console.log(error);
        });
        }
        runEffect();
    }, [id]);

    // 留言
    const handleComment = (event) => {
      event.preventDefault();

      // 若為空值，無法留言
      if (inputRef.current.value === "") {
        alert("請輸入留言");
        return;
      };

      axios.post(API_LOGIN, {
        "email": "r12725066@ntu.edu.tw",
        "password": "a"
      })
      .then(function (response) {
          console.log(response.status, response.data);
          //儲存token
          const token = response.data.jwtToken;
          //設定authorization
          const bodyParameters = {
            key: "value",
          };
          const config = {bodyParameters,
              headers: { "authorization": `Bearer ${token}`}
          };
  
          //留言api
          axios.post(API_GET_ACTIVITY_DETAIL + id + '/discussion', { 
            "content": inputRef.current.value
          },
          config)
            .then(function (res) {
                console.log(res);
                alert('留言成功');
                window.location.reload(false);
            })
            .catch(function (err) {
                alert("留言失敗");
                console.log(err);
          });
      })
      .catch(function (error) {
        // 登入中間出錯
        console.log(error);
      });
    };

    return (
        <Box
        sx={{
          display: 'flex',
          '@media (max-width: 600px)': {
            display: 'block', 
          },
        }}
        >
          <div style={subtitle}><Typography variant="h6"> 討論串 </Typography></div>
            <Paper style={{ padding: "30px 30px", width: "100%" }}>

              { (data.map((comment) => {
              return (
                <>
                  <Grid container wrap="nowrap" spacing={2}>
                      <Grid item>
                        <Avatar alt="Remy Sharp"/>
                      </Grid>
                    <Grid justifyContent="left" item xs zeroMinWidth>
                      <h4 style={{ margin: 0, textAlign: "left" }}> {comment.user.username?comment.user.username: "未知"} </h4>
                      <p style={{ textAlign: "left" }}>
                        {comment.content? comment.content: "無內容"}{" "}
                      </p>
                    </Grid>
                  </Grid>
                  <Divider variant="fullWidth" style={{ margin: "20px 0" }} />
                </>
                  );
                }))
              }
              <Grid container wrap="nowrap" spacing={2}>
                  <Grid item>
                    <Avatar alt="Remy Sharp"/>
                  </Grid>

                  <Grid justifyContent="left" item xs zeroMinWidth spacing={5}>
                    <h4 style={{ margin: 0, textAlign: "left" }}> name </h4>
                    <TextField
                      fullWidth
                      variant="outlined"
                      sx={{ mt: 1}}
                      label="Add comment"
                      inputRef={inputRef}
                    />
                    <div style={style}>
                      <Button type="submit" fullWidth variant="contained" color="primary" onClick={handleComment}>
                        <SendIcon/>
                      </Button>
                    </div>
                  </Grid>

              </Grid>
            </Paper>   
        </Box>
    );
}
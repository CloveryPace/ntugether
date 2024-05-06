import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useRef } from "react";
import { Stack } from '@mui/material';
import Grid from '@mui/material/Grid';
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import RadioGroup from '@mui/material/RadioGroup';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useState } from "react";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
import { API_LOGIN, API_GET_ACTIVITY_DETAIL } from '../global/constants';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
};

const ItemOneTime = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.hashtag.oneTime,
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
}));

const ItemReview = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.hashtag.review,
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
}));

const ItemTag = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.hashtag.type,
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
}));

export default function EditActivityPage({ onHide, show, id, name, introduction, date, location, max_participants, ActivityAtendee, oneTime, need_review, type, application_problem}) {
  const [OneTime, setOneTime] = useState(oneTime); // 一次性活動: true, 長期性活動：false
  const [review, setReview] = useState(need_review); // 需審核: true, 不需審核：false
  const [Type, setType] = useState(type); // 活動類型
  const [actDate, setActDate] = useState(dayjs(date)); 
  const [ID, serID] = useState(id);

  const defaultreview = review ? "需審核" : "不需審核";
  const defaultonetime = oneTime ? "一次性活動" : "長期性活動";

  const inputRefName = useRef();
  const inputRefIntro = useRef();
  const inputRefLocation = useRef();
  const inputRefLimitPerson = useRef();
  const inputRefreviewquestion = useRef();

  const navigate = useNavigate();

  const handleUpdate = (event) => {
    event.preventDefault();

    // 若為空值，無法儲存
    if (inputRefName.current.value === "") {
      alert("請輸入活動名稱");
      return;
    };
    if (inputRefIntro.current.value === ""){
      alert("請輸入活動簡介");
      return;
    };
    if (!actDate){
      alert("請輸入活動時間");
      return;
    };
    if (inputRefLocation.current.value === ""){
      alert("請輸入活動地點");
      return;
    };
    if (inputRefLimitPerson.current.value === ""){
      alert("請輸入人數上限");
      return;
    };
    
    const newName = inputRefName.current.value;
    const newIntro = inputRefIntro.current.value;
    const newTime = actDate;
    const newLocation = inputRefLocation.current.value;
    const newLimitPerson = inputRefLimitPerson.current.value;
    const newReviewQuestion = inputRefreviewquestion.current.value;

    if (newName !== name || newIntro !== introduction || !newTime.isSame(dayjs(date)) || newLocation !== location || newLimitPerson !== max_participants || OneTime !== oneTime || Type !== type || review !== need_review || newReviewQuestion !== application_problem) {
      try {
        //登入
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

            console.log(id);
            //更新活動
            axios.patch(API_GET_ACTIVITY_DETAIL + id, { 
              "id": id,         
              "name": newName,
              "introduction": newIntro,
              "date": newTime,
              "is_one_time": OneTime,
              "type": Type,
              "need_reviewed": review,
              "max_participants": newLimitPerson,
              "location": newLocation,
              "application_problem": newReviewQuestion
            },
              config
            )
            .then(function (res) {
                console.log(res);
                alert('更新成功(*´∀`)~♥');
                window.location.reload(false);
                onHide();
            })
            .catch(function (err) {
              if (err.message === "Request failed with status code 403"){
                alert("非活動建立者無權限更新活動");
              }
              else{
                alert("更新失敗");
              }
          });
        })
        .catch(function (error) {
          // 登入中間出錯
          console.log(error);
        }); 

      } catch (error) {
        //更新出錯
        alert("Error: Failed to update activity name");
      }
    }


    // 確認哪個欄位有更改過
    /*
    if (newIntro !== introduction) {
      try {
        alert("Update Activity introduction!");
      } catch (error) {
        alert("Error: Failed to update activity introduction");
      }
    }
    if (!newTime.isSame(dayjs(date)) ) {
      try {
        alert("Update Activity time!");
      } catch (error) {
        alert("Error: Failed to update activity time");
      }
    }
    if (newLocation !== location) {
      try {
        alert("Update Activity location!");
      } catch (error) {
        alert("Error: Failed to update activity location");
      }
    }
    if (newLimitPerson !== max_participants) {
      try {
        alert("Update Activity limit person!");
      } catch (error) {
        alert("Error: Failed to update activity limit person");
      }
    }
    if (OneTime !== oneTime) {
      try {
        alert("更新是否為一次性活動!");
      } catch (error) {
        alert("錯誤");
      }
    }
    if (Type !== type) {
      try {
        alert("更新活動類別!");
      } catch (error) {
        alert("錯誤");
      }
    }
    if (review !== need_review) {
      try {
        alert("更新是否需審核!");
      } catch (error) {
        alert("錯誤");
      }
    }
    */
  };

  const handleOneTimeChange = (event) => {
      setOneTime((event.target.value) === "一次性活動");
  };

  const handleChangeReview = (event) => {
      setReview((event.target.value) === "需審核");
  };

  const handleChangeType = (event) => {
      setType(event.target.value);
  };

  const handleChangeDate = (dateData) => {
      setActDate(dateData);
  };

  const handleDelete = (id) => {
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

        //刪除活動
        console.log(id);
        axios.delete(API_GET_ACTIVITY_DETAIL + ID, config)
          .then(function (res) {
              console.log(res);
              alert('已刪除活動');
              onHide();
              navigate('/activitylist');
          })
          .catch(function (err) {
              if (err.message === "Request failed with status code 403"){
                alert("非活動建立者無權限刪除活動");
              }
              else{
                alert("刪除失敗");
              }
        });
    })
    .catch(function (error) {
      // 登入中間出錯
      console.log(error);
    });
  };

  return (
    <div>
      <Modal
        open={show}
        onClose={onHide}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>

          <Grid container spacing={10}>
            <Grid item xs={12} md={6}>
              <Button variant="contained" color="error" onClick={handleDelete}> 刪除活動 </Button>
              <Typography variant="h6">活動名稱</Typography>
                  <TextField
                      variant="outlined"
                      defaultValue={name}
                      inputRef={inputRefName}
                      autoFocus
                      fullWidth
                      name="name"
                      label="輸入活動名稱"
                  />
                <Typography variant="h6">活動簡介</Typography>
                  <TextField
                      variant="outlined"
                      defaultValue={introduction}
                      inputRef={inputRefIntro}
                      autoFocus
                      fullWidth
                      name="introduction"
                      label="輸入活動簡介"
                  />
                <Typography variant="h6"> 活動時間 </Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
                        <DatePicker
                        required
                        fullWidth
                        onChange={handleChangeDate}
                        defaultValue={actDate}
                        label="輸入活動時間"
                        name="time"
                        id="activityTime"
                        />
                    </LocalizationProvider>
                <Typography variant="h6">活動地點</Typography>
                  <TextField
                      variant="outlined"
                      defaultValue={location}
                      inputRef={inputRefLocation}
                      autoFocus
                      fullWidth
                      name="location"
                      label="輸入活動地點"
                  />
                <Typography variant="h6">人數上限</Typography>
                  <TextField
                      variant="outlined"
                      defaultValue={max_participants}
                      inputRef={inputRefLimitPerson}
                      autoFocus
                      fullWidth
                      name="limitnumber"
                      label="輸入人數上限"
                  />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6"> 活動類型 </Typography>
                  <RadioGroup aria-label="type" name="type" sx={{ flexDirection: 'row', gap: 2 }} onChange={handleChangeType} defaultValue={type}>
                      {['運動', '讀書會', "出遊"].map((value) => (
                      <Grid item>
                          <ItemTag> 
                              <FormControlLabel
                                  value={value}
                                  control={<Radio />}
                                  label={`${value}`}
                                  labelPlacement="end"
                              />
                          </ItemTag>
                      </Grid>
                      ))}
                  </RadioGroup>
                  <Typography variant="h6"> 一次性活動 </Typography>
                    <RadioGroup aria-label="onetime" name="oneTime" sx={{ flexDirection: 'row', gap: 2 }} onChange={handleOneTimeChange} defaultValue={defaultonetime}>
                        {['一次性活動', '長期性活動'].map((value) => (
                        <Grid item>
                            <ItemOneTime> 
                                <FormControlLabel
                                    value={value}
                                    control={<Radio />}
                                    label={`${value}`}
                                    labelPlacement="end"
                                />
                            </ItemOneTime>
                        </Grid>
                        ))}
                    </RadioGroup>
                    <Typography variant="h6"> 加入審核 </Typography>
                    <RadioGroup aria-label="review" name="review" sx={{ flexDirection: 'row', gap: 2 }} onChange={handleChangeReview} defaultValue={defaultreview}>
                        {['需審核', '不需審核'].map((value) => (
                        <Grid item>
                            <ItemReview> 
                                <FormControlLabel
                                    value={value}
                                    control={<Radio />}
                                    label={`${value}`}
                                    labelPlacement="end"
                                />
                            </ItemReview>
                        </Grid>
                        ))}
                    </RadioGroup>
                    <Typography variant="h6"> </Typography>
                    <TextField
                        variant="outlined"
                        defaultValue={application_problem}
                        inputRef={inputRefreviewquestion}
                        autoFocus
                        fullWidth
                        name="application_problem"
                        label="輸入審核題目"
                    />
            </Grid>
          </Grid>

          <Typography variant="h6"> </Typography>
          <Grid container justifyContent="center">
              <Grid item>
                <Stack direction="row" spacing={2}>
                    <Button variant="contained" type="submit" color="primary" onClick={handleUpdate}> 儲存 </Button>
                    <Button variant="contained" color="error" onClick={onHide}> 取消 </Button>
                </Stack>
              </Grid>
          </Grid>

        </Box>
      </Modal>
    </div>
  );
}
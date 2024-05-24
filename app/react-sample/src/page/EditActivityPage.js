import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useRef } from "react";
import { Stack, speedDialActionClasses } from '@mui/material';
import Grid from '@mui/material/Grid';
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import RadioGroup from '@mui/material/RadioGroup';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useState } from "react";
import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
import { API_GET_ACTIVITY_DETAIL } from '../global/constants';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getAuthToken } from '../utils';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

// 頭像顏色根據名字變化
function stringToColor(string) {
  let hash = 0;
  let i;
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
}
function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name[0]}`,
  };
}

const container = { 
  display: "flex",
  margin: "1rem"
};

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

export default function EditActivityPage({ onHide, show, id, name, introduction, date, location, max_participants, ActivityAtendee, oneTime, need_reviewed, type, application_problem}) {
  const [OneTime, setOneTime] = useState(oneTime); // 一次性活動: true, 長期性活動：false
  const [review, setReview] = useState(need_reviewed); // 需審核: true, 不需審核：false
  const [Type, setType] = useState(type); // 活動類型
  const [actDate, setActDate] = useState(dayjs(date)); 
  const [ID, serID] = useState(id);
  const [userToken, setUserToken] = useState(getAuthToken());

  console.log("參加者有這些")
  console.log(ActivityAtendee);
  
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

    if (newName !== name || newIntro !== introduction || !newTime.isSame(dayjs(date)) || newLocation !== location || newLimitPerson !== max_participants || OneTime !== oneTime || Type !== type || review !== need_reviewed || newReviewQuestion !== application_problem) {
      try { 
            //儲存token
            const token = userToken;

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
      } catch (error) {
        //更新出錯
        alert("Error: Failed to update activity name");
      }
    }
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
    //儲存token
    const token = userToken;
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
  };

  const handleDeleteAttendee = (user_id) => {
    //儲存token
    const token = userToken;
    //設定authorization
    const bodyParameters = {
      key: "value",
    };
    const config = {bodyParameters,
        headers: { "authorization": `Bearer ${token}`}
    };
    //刪除參加者
    console.log(id); //活動id
    axios.patch(API_GET_ACTIVITY_DETAIL + ID + '/remove-user', {
      "remove_user_id": user_id
    },
    config)
      .then(function (res) {
          console.log(res);
          alert('已刪除參加者');
          window.location.reload(false);
      })
      .catch(function (err) {
          if (err.message === "Request failed with status code 403"){
            alert("非活動建立者無權限刪除參加者");
          }
          else{
            alert("刪除失敗");
          }
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
                        <DesktopDateTimePicker
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
                <Typography variant="h6">參加者</Typography>
                <div style={container}>
                  {ActivityAtendee.length > 0 ?
                    (ActivityAtendee.map((person) => {
                      return (
                          <div style={{alignSelf: 'center', margin: "0.5rem"}}>
                            <IconButton style={{float: 'right'}} onClick={() => handleDeleteAttendee(person.participants)}>
                              <DeleteIcon/>
                            </IconButton>
                            <Chip avatar={<Avatar {...stringAvatar(person.User? person.User.name: "未知")}/>} label={person.User? person.User.name: "未知"}></Chip>
                          </div>
                      );
                    }))
                    :
                  <div style={{alignSelf: 'center'}}>
                      尚無參加者
                  </div>
                }
                </div>
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
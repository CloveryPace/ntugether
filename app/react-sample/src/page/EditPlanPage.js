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
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
import { API_GET_PLAN_DETAIL } from '../global/constants';
import axios from 'axios';
import { getAuthToken } from '../utils';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
    overflowY: 'auto', // 使內容可以垂直滾動
    maxHeight: '90vh', // 設置最大高度，防止內容過長
    width: '80%', // 設置寬度以適應小屏幕設備
  };

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


export default function EditPlanPage({ onHide, show, id, name, goal, introduction, start_date, end_date, need_reviewed, tags, application_problem }) {
  const [review, setReview] = useState(need_reviewed); // 需審核: true, 不需審核：false
  const [Tags, setTags] = useState(tags); // 計畫類型
  const [startDate, setStartDate] = useState(dayjs(start_date));
  const [endDate, setEndDate] = useState(dayjs(end_date));
  const [userToken, setUserToken] = useState(getAuthToken());

  const inputRefName = useRef();
  const inputRefGoal = useRef();
  const inputRefIntro = useRef();
  const inputRefReviewQuestion = useRef();

  const handleUpdate = (event) => {
    event.preventDefault();

    // 若為空值，無法儲存
    if (inputRefName.current.value === "") {
      alert("請輸入計畫名稱");
      return;
    };
    if (inputRefGoal.current.value === ""){
      alert("請輸入計畫目標");
      return;
    };
    if (inputRefIntro.current.value === ""){
      alert("請輸入計畫介紹");
      return;
    };
    if (!startDate){
      alert("請輸入開始日期");
      return;
    };
    if (!endDate){
      alert("請輸入結束日期");
      return;
    };

    const newName = inputRefName.current.value;
    const newGoal = inputRefGoal.current.value;
    const newIntro = inputRefIntro.current.value;
    const newReviewQuestion = inputRefReviewQuestion.current.value;

    // 送出更新請求
    axios.patch(API_GET_PLAN_DETAIL + id, {
      "id": id,
      "name": newName,
      "goal": newGoal,
      "introduction": newIntro,
      "start_date": startDate,
      "end_date": endDate,
      "need_reviewed": review,
      "tags": Tags,
      "application_problem": newReviewQuestion
    }, {
      headers: { "authorization": `Bearer ${userToken}`}
    })
    .then(function (res) {
      alert('更新成功');
      window.location.reload(false);
      onHide();
    })
    .catch(function (err) {
      alert("更新失敗");
    });
  };

  const handleChangeReview = (event) => {
    setReview((event.target.value) === "需審核");
  };

  const handleChangeTags = (event) => {
    const tagValue = event.target.value;

    const tagMapping = {
        "運動": "Exercise",
        "學習": "Learning",
        "考試": "Exam"
    };

    const englishTag = tagMapping[tagValue] || tagValue;

    setTags([englishTag]);
};

  const handleChangeStartDate = (date) => {
    setStartDate(date);
  };

  const handleChangeEndDate = (date) => {
    setEndDate(date);
  };

  return (
    <Modal
      open={show}
      onClose={onHide}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">計畫名稱</Typography>
            <TextField
              variant="outlined"
              defaultValue={name}
              inputRef={inputRefName}
              autoFocus
              fullWidth
              name="name"
              label="輸入計畫名稱"
            />
            <Typography variant="h6">計畫目標</Typography>
            <TextField
              variant="outlined"
              defaultValue={goal}
              inputRef={inputRefGoal}
              autoFocus
              fullWidth
              name="goal"
              label="輸入計畫目標"
            />
            <Typography variant="h6">計畫介紹</Typography>
            <TextField
              variant="outlined"
              defaultValue={introduction}
              inputRef={inputRefIntro}
              autoFocus
              fullWidth
              name="introduction"
              label="輸入計畫介紹"
            />
            <Typography variant="h6">開始日期</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                required
                fullWidth
                onChange={handleChangeStartDate}
                defaultValue={startDate}
                label="輸入開始日期"
                name="start_date"
                id="start_date"
              />
            </LocalizationProvider>
            <Typography variant="h6">結束日期</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                required
                fullWidth
                onChange={handleChangeEndDate}
                defaultValue={endDate}
                label="輸入結束日期"
                name="end_date"
                id="end_date"
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6"> 計畫類型 </Typography>
            <RadioGroup aria-label="tags" name="tags" sx={{ flexDirection: 'row', gap: 2 }} onChange={handleChangeTags} defaultValue={tags}>
              {['運動', "學習", "考試"].map((value) => (
                <Grid item key={value}>
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
            <Typography variant="h6"> 加入審核 </Typography>
            <RadioGroup aria-label="review" name="review" sx={{ flexDirection: 'row', gap: 2 }} onChange={handleChangeReview} defaultValue={need_reviewed ? "需審核" : "不需審核"}>
              {['需審核', '不需審核'].map((value) => (
                <Grid item key={value}>
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
            <Typography variant="h6"> 審核問題 </Typography>
            <TextField
              variant="outlined"
              defaultValue={application_problem}
              inputRef={inputRefReviewQuestion}
              autoFocus
              fullWidth
              name="application_problem"
              label="輸入審核問題"
            />
          </Grid>
        </Grid>

        <Grid container justifyContent="center" sx={{ mt: 2 }}>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" color="primary" onClick={handleUpdate}> 儲存 </Button>
            <Button variant="contained" color="error" onClick={onHide}> 取消 </Button>
          </Stack>
        </Grid>
      </Box>
    </Modal>
  );
}

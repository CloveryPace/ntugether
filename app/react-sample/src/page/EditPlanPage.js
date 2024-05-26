import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useRef, useState } from "react";
import { Stack, Grid, TextField, Button, RadioGroup, Paper, Radio, FormControlLabel, IconButton, Chip, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
import { API_GET_PLAN_DETAIL } from '../global/constants';
import axios from 'axios';
import { getAuthToken } from '../utils';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTranslation } from 'react-i18next';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
    overflowY: 'auto',
    maxHeight: '90vh',
    width: '80%',
};

const container = { 
  display: "flex",
  margin: "1rem"
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

export default function EditPlanPage({ onHide, show, id, name, goal, introduction, start_date, end_date, need_reviewed, tags, application_problem, atendee }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [review, setReview] = useState(need_reviewed);
  const [Tags, setTags] = useState(tags);
  const [startDate, setStartDate] = useState(dayjs(start_date));
  const [endDate, setEndDate] = useState(dayjs(end_date));
  const [userToken, setUserToken] = useState(getAuthToken());
  const [ID, serID] = useState(id);
  const [removedParticipants, setRemovedParticipants] = useState([]);
  const [attendees, setAttendees] = useState(atendee);

  const inputRefName = useRef();
  const inputRefGoal = useRef();
  const inputRefIntro = useRef();
  const inputRefReviewQuestion = useRef();

  const handleUpdate = (event) => {
    event.preventDefault();

    if (inputRefName.current.value === "") {
      alert(t("請輸入計畫名稱"));
      return;
    }
    if (inputRefGoal.current.value === ""){
      alert(t("請輸入計畫目標"));
      return;
    }
    if (inputRefIntro.current.value === ""){
      alert(t("請輸入計畫介紹"));
      return;
    }
    if (!startDate){
      alert(t("請輸入開始日期"));
      return;
    }
    if (!endDate){
      alert(t("請輸入結束日期"));
      return;
    }

    const newName = inputRefName.current.value;
    const newGoal = inputRefGoal.current.value;
    const newIntro = inputRefIntro.current.value;
    const newReviewQuestion = inputRefReviewQuestion.current.value;

    axios.patch(API_GET_PLAN_DETAIL + id, {
      "name": newName,
      "goal": newGoal,
      "introduction": newIntro,
      "start_date": startDate.format('YYYY-MM-DD'),
      "end_date": endDate.format('YYYY-MM-DD'),
      "tags": Tags,
      "invitees": [],
      "need_reviewed": review,
      "application_problem": newReviewQuestion,
      "removed_participants": removedParticipants
    }, {
      headers: { "authorization": `Bearer ${userToken}`}
    })
    .then(function (res) {
      alert(t('更新成功'));
      window.location.reload(false);
      onHide();
    })
    .catch(function (err) {
      alert(t("更新失敗"));
    });
  };

  const handleChangeReview = (event) => {
    setReview((event.target.value) === t("需審核"));
  };

  const handleChangeTags = (event) => {
    const tagValue = event.target.value;

    const tagMapping = {
        [t("運動")]: "Exercise",
        [t("學習")]: "Learning",
        [t("考試")]: "Exam"
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

  const handleDeleteAttendee = (participantId) => {
    setRemovedParticipants([...removedParticipants, participantId]);
    setAttendees(attendees.filter(person => person.user_id !== participantId));
  };

  const handleDelete = () => {
    const token = userToken;
    const bodyParameters = {
      key: "value",
    };
    const config = {bodyParameters,
        headers: { "authorization": `Bearer ${token}`}
    };
    axios.delete(API_GET_PLAN_DETAIL + ID, config)
      .then(function (res) {
          console.log(res);
          alert(t('已刪除計畫'));
          navigate('/PlanList');
      })
      .catch(function (err) {
          if (err.message === "Request failed with status code 403"){
            alert(t("非活動建立者無權限刪除活計畫"));
          }
          else{
            alert(t("刪除失敗"));
          }
    });
  };

  const stringAvatar = (name) => {
    let initials = name.split(' ').map((word) => word[0]).join('');
    return {
      children: initials,
    };
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
            <Typography variant="h6">{t('計畫名稱')}</Typography>
            <TextField
              variant="outlined"
              defaultValue={name}
              inputRef={inputRefName}
              autoFocus
              fullWidth
              name="name"
              label={t("輸入計畫名稱")}
            />
            <Typography variant="h6">{t('計畫目標')}</Typography>
            <TextField
              variant="outlined"
              defaultValue={goal}
              inputRef={inputRefGoal}
              autoFocus
              fullWidth
              name="goal"
              label={t("輸入計畫目標")}
            />
            <Typography variant="h6">{t('計畫介紹')}</Typography>
            <TextField
              variant="outlined"
              defaultValue={introduction}
              inputRef={inputRefIntro}
              autoFocus
              fullWidth
              name="introduction"
              label={t("輸入計畫介紹")}
            />
            <Typography variant="h6">{t('開始日期')}</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                required
                fullWidth
                value={startDate}
                onChange={handleChangeStartDate}
                label={t("輸入開始日期")}
                name="start_date"
                id="start_date"
                format="YYYY-MM-DD"
              />
            </LocalizationProvider>
            <Typography variant="h6">{t('結束日期')}</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                required
                fullWidth
                value={endDate}
                onChange={handleChangeEndDate}
                label={t("輸入結束日期")}
                name="end_date"
                id="end_date"
                format="YYYY-MM-DD"
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">{t('計畫類型')}</Typography>
            <RadioGroup aria-label="tags" name="tags" sx={{ flexDirection: 'row', gap: 2 }} onChange={handleChangeTags} defaultValue={tags}>
              {[t('運動'), t("學習"), t("考試")].map((value) => (
                <Grid item key={value}>
                  <ItemTag>
                    <FormControlLabel
                      value={value}
                      control={<Radio />}
                      label={value}
                      labelPlacement="end"
                    />
                  </ItemTag>
                </Grid>
              ))}
            </RadioGroup>
            <Typography variant="h6">{t('加入審核')}</Typography>
            <RadioGroup aria-label="review" name="review" sx={{ flexDirection: 'row', gap: 2 }} onChange={handleChangeReview} defaultValue={need_reviewed ? t("需審核") : t("不需審核")}>
              {[t('需審核'), t('不需審核')].map((value) => (
                <Grid item key={value}>
                  <ItemReview>
                    <FormControlLabel
                      value={value}
                      control={<Radio />}
                      label={value}
                      labelPlacement="end"
                    />
                  </ItemReview>
                </Grid>
              ))}
            </RadioGroup>
            <Typography variant="h6">{t('審核問題')}</Typography>
            <TextField
              variant="outlined"
              defaultValue={application_problem}
              inputRef={inputRefReviewQuestion}
              autoFocus
              fullWidth
              name="application_problem"
              label={t("輸入審核問題")}
            />
          <Typography variant="h6">{t('參與者')}</Typography>
          <Grid item style={container}>
            {attendees.length > 0 ?
              (attendees.map((person) => {
                return (
                    <div style={{alignSelf: 'center', margin: "0.5rem"}} key={person.user_id}>
                      <IconButton style={{float: 'right'}} onClick={() => handleDeleteAttendee(person.user_id)}>
                        <DeleteIcon/>
                      </IconButton>
                      <Chip avatar={<Avatar {...stringAvatar(person.name ? person.name : t("未知"))}/>} label={person.name ? person.name : t("未知")}></Chip>
                    </div>
                );
              }))
              :
            <div style={{alignSelf: 'center'}}>
                {t("尚無參加者")}
            </div>
            }
          </Grid>
          </Grid>
        </Grid>

        <Grid container justifyContent="center" sx={{ mt: 2 }}>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" color="error" onClick={handleDelete}>{t('刪除計畫')}</Button>
            <Button variant="contained" color="error" onClick={onHide}>{t('取消')}</Button>
            <Button variant="contained" color="primary" onClick={handleUpdate}>{t('儲存')}</Button>
          </Stack>
        </Grid>
      </Box>
    </Modal>
  );
}

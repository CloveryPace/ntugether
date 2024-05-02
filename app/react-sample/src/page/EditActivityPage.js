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

export default function EditActivityPage({ onHide, show, ActivityName, ActivityIntro, ActivityTime, ActivityLocation, ActivityLimitPerson, ActivityAtendee, ActivityOnetime, ActivityReview, ActivityType}) {
  const [oneTime, setOneTime] = useState(ActivityOnetime); // 一次性活動: true, 長期性活動：false
  const [review, setReview] = useState(ActivityReview); // 需審核: true, 不需審核：false
  const [type, setType] = useState(ActivityType); // 活動類型
  const [actDate, setActDate] = useState(dayjs(ActivityTime)); 

  const defaultreview = review ? "需審核" : "不需審核";
  const defaultonetime = oneTime ? "一次性活動" : "長期性活動";

  const inputRefName = useRef();
  const inputRefIntro = useRef();
  const inputRefLocation = useRef();
  const inputRefLimitPerson = useRef();

  const handleUpdate = () => {
    if (inputRefName.current.value === "") return;
    if (inputRefIntro.current.value === "") return;
    if (!actDate) return;
    if (inputRefLocation.current.value === "") return;
    if (inputRefLimitPerson.current.value === "") return;

    const newName = inputRefName.current.value;
    const newIntro = inputRefIntro.current.value;
    const newTime = actDate;
    const newLocation = inputRefLocation.current.value;
    const newLimitPerson = inputRefLimitPerson.current.value;

    if (newName !== ActivityName) {
      try {
        alert("Update Activity Name!");
      } catch (error) {
        alert("Error: Failed to update activity name");
      }
    }
    if (newIntro !== ActivityIntro) {
      try {
        alert("Update Activity introduction!");
      } catch (error) {
        alert("Error: Failed to update activity introduction");
      }
    }
    if (!newTime.isSame(dayjs(ActivityTime)) ) {
      try {
        alert("Update Activity time!");
      } catch (error) {
        alert("Error: Failed to update activity time");
      }
    }
    if (newLocation !== ActivityLocation) {
      try {
        alert("Update Activity location!");
      } catch (error) {
        alert("Error: Failed to update activity location");
      }
    }
    if (newLimitPerson !== ActivityLimitPerson) {
      try {
        alert("Update Activity limit person!");
      } catch (error) {
        alert("Error: Failed to update activity limit person");
      }
    }
    if (oneTime !== ActivityOnetime) {
      try {
        alert("更新是否為一次性活動!");
      } catch (error) {
        alert("錯誤");
      }
    }
    if (type !== ActivityType) {
      try {
        alert("更新活動類別!");
      } catch (error) {
        alert("錯誤");
      }
    }
    if (review !== ActivityReview) {
      try {
        alert("更新是否需審核!");
      } catch (error) {
        alert("錯誤");
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
              <Typography variant="h6">活動名稱</Typography>
                  <TextField
                      variant="outlined"
                      defaultValue={ActivityName}
                      inputRef={inputRefName}
                      autoFocus
                      fullWidth
                      name="name"
                      label="輸入活動名稱"
                  />
                <Typography variant="h6">活動簡介</Typography>
                  <TextField
                      variant="outlined"
                      defaultValue={ActivityIntro}
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
                      defaultValue={ActivityLocation}
                      inputRef={inputRefLocation}
                      autoFocus
                      fullWidth
                      name="location"
                      label="輸入活動地點"
                  />
                <Typography variant="h6">人數上限</Typography>
                  <TextField
                      variant="outlined"
                      defaultValue={ ActivityLimitPerson}
                      inputRef={inputRefLimitPerson}
                      autoFocus
                      fullWidth
                      name="limitnumber"
                      label="輸入人數上限"
                  />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6"> 活動類型 </Typography>
                  <RadioGroup aria-label="type" name="type" sx={{ flexDirection: 'row', gap: 2 }} onChange={handleChangeType} defaultValue={ActivityType}>
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
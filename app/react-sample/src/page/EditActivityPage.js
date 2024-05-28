import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
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
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

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

/*
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
  overflow: "hidden",
  overflowY: "scroll",
  display: "flex",
  flexDirection: "column",
  height: 700,
};
*/

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

export default function EditActivityPage({ onHide, show, id, data}) {
  const { t, i18n } = useTranslation();
  const [ID, setID] = useState(id);
  const [attendee, setAttendee] = useState(data.Participants);
  const [dateitems, setDateitems] = useState((Array.isArray(data.date)? data.date: [data.date]));
  const navigate = useNavigate();

  // 初始化從ActivityPage傳進的值
  const [newdata, setNewdata] = useState({
    name: data.name,
    introduction: data.introduction,
    date: (Array.isArray(data.date)? data.date: [data.date]),
    inviteName: '',
    is_one_time: data.is_one_time,
    type: data.type,
    need_reviewed: data.need_reviewed,
    country: "Taiwan",
    max_participants: data.max_participants,
    location: data.location,
    application_problem: data.application_problem
  })

  const handleUpdate = (event) => {
    event.preventDefault();
      try { 
        const token = getAuthToken();
        const bodyParameters = {
          key: "value",
        };
        const config = {bodyParameters,
            headers: { "authorization": `Bearer ${token}`}
        };

        console.log(newdata);

        //更新活動
        axios.patch(API_GET_ACTIVITY_DETAIL + id, newdata,
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
  };

  //更新
  const handleOneTimeChange = (event) => {
      handleChange(event);
  };
  const handleChangeReview = (event) => {
      handleChange(event);
  };
  const handleChangeType = (event) => {
      handleChange(event);
  };
  const handleAddClick = () => {
      setDateitems([...dateitems, dayjs()]);
  };
  const handleDeleteClick = (index) => {
      var newdateItems = [...dateitems];
      console.log("After delete");
      var edited = newdateItems.splice(index, 1); //被刪除的元素
      setDateitems(newdateItems);
      const event = { 
          "target": {
              "value": newdateItems,
              "name": "date"
          }
      };
      handleChange(event);
  };
  const handleChangeDateMul = (index, value) => {
      const newdateItems = [...dateitems];
      newdateItems[index] = value;
      console.log(newdateItems);
      setDateitems(newdateItems);
      const event = { 
          "target": {
              "value": dateitems,
              "name": "date"
          }
      };
      handleChange(event);
  };
  const handleChange = e => {
    const { name, value } = e.target;
    setNewdata(prevState => ({
        ...prevState,
        [name]: value
    }));
    console.log(newdata);
  };  

  const handleDelete = (id) => {
    const token = getAuthToken();
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
    const token = getAuthToken();
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

  useEffect(() => {
    if (newdata.is_one_time === "true"){
        if (Array.isArray(data.date)){
            console.log("重置日期");
            var newdateItems = [dateitems[0]];
            setDateitems(newdateItems);
            const event = { 
                "target": {
                    "value": newdateItems,
                    "name": "date"
                }
            };
            handleChange(event);
        }
    }
    }, [newdata.is_one_time]);

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
              <Button variant="contained" color="error" onClick={handleDelete}> {t("刪除活動")} </Button>
              <Typography variant="h6">{t("活動名稱")}</Typography>
                  <TextField
                      variant="outlined"
                      value={newdata.name}
                      onChange={handleChange}
                      autoFocus
                      fullWidth
                      name="name"
                      label={t("輸入活動名稱")}
                  />
                <Typography variant="h6">{t("活動簡介")}</Typography>
                  <TextField
                      variant="outlined"
                      value={newdata.introduction}
                      onChange={handleChange}
                      autoFocus
                      fullWidth
                      name="introduction"
                      label={t("輸入活動簡介")}
                  />
                  <Typography variant="h6"></Typography>
                  <Stack direction="row" spacing={2}>
                      <Typography variant="h6"> {t("活動時間")} </Typography>
                      {(newdata.is_one_time === "true" || newdata.is_one_time === true)?
                        <></>
                        :
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                        <Button variant="contained" color="primary" onClick={handleAddClick}> + </Button>
                        </Box>
                        }
                  </Stack>
                    {newdata.date.map((item, index) => (
                        <Box
                        key={index}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                            mb: 2
                        }}
                        >
                        <Stack direction="row" spacing={2} justifyContent="space-between">
                            <Typography variant="h6" sx={{ minWidth: '30px' }}>{index + 1}.</Typography>
                            {newdata.date.length > 1 && (
                                <IconButton onClick={() => handleDeleteClick(index)}>
                                <DeleteIcon />
                                </IconButton>
                            )}
                        </Stack>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2,
                            }}
                        >
                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
                                <DesktopDateTimePicker
                                value={dayjs(item)}
                                onChange={(e) => handleChangeDateMul(index, e)}
                                name="date"
                                required
                                fullWidth
                                label={t("輸入活動時間")}
                                id="date"
                                />
                            </LocalizationProvider>
                        </Box>
                        </Box>
                    ))}
                <Typography variant="h6">{t("活動地點")}</Typography>
                  <TextField
                      variant="outlined"
                      defaultValue={newdata.location}
                      onChange={handleChange}
                      autoFocus
                      fullWidth
                      name="location"
                      label={t("輸入活動地點")}
                  />
                <Typography variant="h6">{t("人數上限")}</Typography>
                  <TextField
                      variant="outlined"
                      defaultValue={newdata.max_participants}
                      onChange={handleChange}
                      autoFocus
                      fullWidth
                      name="limitnumber"
                      label={t("輸入人數上限")}
                  />
                <Typography variant="h6">{t("參加者")}</Typography>
                <div style={container}>
                  {attendee.length > 0 ?
                    (attendee.map((person) => {
                      return (
                          <div style={{alignSelf: 'center', margin: "0.5rem"}}>
                            <IconButton style={{float: 'right'}} onClick={() => handleDeleteAttendee(person.user_id)}>
                              <DeleteIcon/>
                            </IconButton>
                            <Chip avatar={<Avatar {...stringAvatar(person.name? person.name: t("未知"))}/>} label={person.name? person.name: "未知"}></Chip>
                          </div>
                      );
                    }))
                    :
                  <div style={{alignSelf: 'center'}}>
                      {t("尚無參加者")}
                  </div>
                }
                </div>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6"> {t("活動類型")} </Typography>
                  <RadioGroup aria-label="type" name="type" sx={{ flexDirection: 'row', gap: 2 }} onChange={handleChangeType} defaultValue={newdata.type}>
                      {['運動', '學習', "出遊", "其他"].map((value) => (
                      <Grid item>
                          <ItemTag> 
                              <FormControlLabel
                                  value={value}
                                  control={<Radio />}
                                  label={t(`${value}`)}
                                  labelPlacement="end"
                              />
                          </ItemTag>
                      </Grid>
                      ))}
                  </RadioGroup>
                  <Typography variant="h6"> {t("一次性活動")} </Typography>
                    <RadioGroup aria-label="is_one_time" name="is_one_time" sx={{ flexDirection: 'row', gap: 2 }} onChange={handleOneTimeChange} defaultValue={newdata.is_one_time}>
                        {['一次性活動', '長期性活動'].map((value) => (
                        <Grid item>
                            <ItemOneTime> 
                                <FormControlLabel
                                    value={(value === '一次性活動')}
                                    control={<Radio />}
                                    label={t(`${value}`)}
                                    labelPlacement="end"
                                />
                            </ItemOneTime>
                        </Grid>
                        ))}
                    </RadioGroup>
                    <Typography variant="h6"> {t("加入審核")} </Typography>
                    <RadioGroup aria-label="need_reviewed" name="need_reviewed" sx={{ flexDirection: 'row', gap: 2 }} onChange={handleChangeReview} defaultValue={newdata.need_reviewed}>
                        {['需審核', '不需審核'].map((value) => (
                        <Grid item>
                            <ItemReview> 
                                <FormControlLabel
                                    value={value === "需審核"}
                                    control={<Radio />}
                                    label={t(`${value}`)}
                                    labelPlacement="end"
                                />
                            </ItemReview>
                        </Grid>
                        ))}
                    </RadioGroup>
                    <Typography variant="h6"> </Typography>
                    <TextField
                        variant="outlined"
                        defaultValue={newdata.application_problem}
                        onChange={handleChange}
                        autoFocus
                        fullWidth
                        name="application_problem"
                        label={t("輸入審核題目")}
                    />
            </Grid>
          </Grid>

          <Typography variant="h6"> </Typography>
          <Grid container justifyContent="center">
              <Grid item>
                <Stack direction="row" spacing={2}>
                    <Button variant="contained" type="submit" color="primary" onClick={handleUpdate}> {t("儲存")} </Button>
                    <Button variant="contained" color="error" onClick={onHide}> {t("取消")} </Button>
                </Stack>
              </Grid>
          </Grid>

        </Box>
      </Modal>
    </div>
  );
}
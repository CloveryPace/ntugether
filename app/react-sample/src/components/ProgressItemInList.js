import * as React from 'react';
import { useState, useEffect } from 'react';
import { ListItem, ListItemText, Paper, Button, Box, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Radio, RadioGroup, FormControlLabel, Chip, Select, MenuItem, FormControl, InputLabel  } from '@mui/material';
import { useTheme } from '@mui/material';
import axios from 'axios';
import { API_GET_USER_PROGRESS, API_CREATE_ACTIVITY } from '../global/constants';
import { getAuthToken } from '../utils';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';


export default function ProgressItemInList({ key, item, onUpdate }) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [userToken, setUserToken] = useState(getAuthToken());
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [activities, setActivities] = useState([]);
  const [progressDetails, setProgressDetails] = React.useState({
    ...item,
    user_progress_date: item.user_progress_date ? dayjs(item.user_progress_date) : null,
  });

  useEffect(() => {
    const token = getAuthToken();
    const config = {
      headers: { 
        authorization: `Bearer ${token}`
      },
      params: { 
        mode: "joined"
      }
    };
    // 取得使用者參與的活動列表
    axios.get(API_CREATE_ACTIVITY, config)
        .then(function (res) {
            console.log('取得使用者參與的活動成功');
            console.log(res.data);
            setActivities(res.data);
        })
        .catch(function (err) {
            console.log(err);
            console.log('取得使用者參與的活動失敗');
        });
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    const token = userToken;
    const config = {
      headers: { 'Authorization': `Bearer ${token}` },
    };

    try {
      await axios.put(
        `${API_GET_USER_PROGRESS}/${progressDetails.userProgress_id}/userprocess`,
        progressDetails,
        config
      );
      setOpen(false);
      onUpdate();
    } catch (err) {
      console.error('Error saving progress:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProgressDetails({
      ...progressDetails,
      [name]: value
    });
  };

  const handleDateChange = (date) => {
    setProgressDetails({
      ...progressDetails,
      user_progress_date: date
    });
  };

  return (
    <>
      <Paper elevation={3} style={{ marginBottom: '10px', padding: '10px', backgroundColor: theme.palette.primary.light }}>
        <ListItem>
          <ListItemText 
            primary={
              <>
                {t("進度名稱") + "：" + item.name} 
                <br/>
                {item.is_finished ? t("完成時間") + "：" : t("預期時間") + "："}{formatDate(item.user_progress_date)}
                <br/>
                {t("進度細節") + "：" + item.description}
                <br/>
                {progressDetails.activity_detail ?
                <div onClick={() => navigate(`/activityPage`, { state: { id: progressDetails.activity_detail } })} style={{ cursor: 'pointer', textDecoration: 'underline'}}>
                  {t("揪團活動參與紀錄連結")}
                </div>
                :<></>
                }
              </>
            } 
          />
        </ListItem>
        <div style={{ padding: 5 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>{item.is_finished ? t("編輯") : t("完成/編輯")}</Button>
          </Box>
        </div>
      </Paper>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {t("編輯進度")}
          <Chip label={item.is_finished ? t("已完成") : t("未完成")} 
                style={{
                  backgroundColor: theme.palette.primary.main,
                  float: 'right'
                }} />
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label={t("進度名稱")}
            type="text"
            fullWidth
            value={progressDetails.name}
            name="name"
            onChange={handleChange}
            disabled
          />
          <br/>
          <br/>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              margin="dense"
              value={progressDetails.user_progress_date}
              onChange={handleDateChange}
              name="user_progress_date"
              fullWidth
              label={progressDetails.is_finished ? t("完成時間") : t("預期時間")}
              id="user_progress_date"
            />
          </LocalizationProvider>
          <br/>
          <br/>
          <TextField
            margin="dense"
            label={t("進度細節")}
            type="text"
            fullWidth
            value={progressDetails.description}
            name="description"
            onChange={handleChange}
          />
          <br/>
          <br/>
          {item.need_activity && (
            <>
              <FormControl fullWidth margin="dense">
                <InputLabel id="activity-select-label">{t("揪團活動參與紀錄")}</InputLabel>
                <Select
                  labelId="activity-select-label"
                  id="activity-select"
                  value={progressDetails.activity_detail}
                  onChange={handleChange}
                  fullWidth
                  name="activity_detail"
                  label={t("揪團活動參與紀錄")}
                >
                  {activities.map(activity => (
                    <MenuItem key={activity.activity_id} value={activity.activity_id}>
                      {activity.activity_id} - {activity.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </>
          )}
          <RadioGroup
            row
            name="is_finished"
            value={progressDetails.is_finished}
            onChange={handleChange}
          >
            <FormControlLabel value={false} control={<Radio />} label={t("未完成")} />
            <FormControlLabel value={true} control={<Radio />} label={t("已完成")} />
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">{t("取消")}</Button>
          <Button onClick={handleSave} color="primary">{t("儲存")}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

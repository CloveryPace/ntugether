import * as React from 'react';
import { useState } from 'react';
import { ListItem, ListItemText, Paper, Button, Box, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Radio, RadioGroup, FormControlLabel, Chip } from '@mui/material';
import { useTheme } from '@mui/material';
import axios from 'axios';
import { API_GET_USER_PROGRESS } from '../global/constants';
import { getAuthToken } from '../utils';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs'; 
import { useTranslation } from 'react-i18next';

export default function ProgressItemInList({ key, item, onUpdate }) {
  const { t } = useTranslation();
  const [userToken, setUserToken] = useState(getAuthToken());
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [progressDetails, setProgressDetails] = React.useState({
    ...item,
    user_progress_date: item.user_progress_date ? dayjs(item.user_progress_date) : null
  });

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
      alert(t("error"));
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
            <TextField
              margin="dense"
              label={t("揪團活動參與紀錄")}
              type="text"
              fullWidth
              value={progressDetails.activity_detail}
              name="activity_detail"
              onChange={handleChange}
            />
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

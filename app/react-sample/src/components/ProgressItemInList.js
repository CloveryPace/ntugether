import * as React from 'react';
import { useState } from 'react';
import { ListItem, ListItemText, Paper } from '@mui/material';
import { useTheme } from '@mui/material';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Chip from '@mui/material/Chip';
import axios from 'axios';
import { API_GET_USER_PROGRESS } from '../global/constants';
import { getAuthToken } from '../utils';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs'; // Import dayjs

export default function ProgressItemInList({ key, item, onUpdate}) {
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
      alert("error");
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

  console.log(item);

  return (
    <>
      <Paper elevation={3} style={{ marginBottom: '10px', padding: '10px', backgroundColor: theme.palette.primary.light }}>
        <ListItem>
          <ListItemText 
            primary={
              <>
                {"進度名稱：" + item.name} 
                <br/>
                {item.is_finished ? "完成時間：" : "預期時間："}{formatDate(item.user_progress_date)}
                <br/>
                {"進度細節：" + item.description}
              </>
            } 
          />
        </ListItem>
        <div style={{ padding: 5 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>{item.is_finished ? "編輯" : "完成/編輯"}</Button>
          </Box>
        </div>
      </Paper>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          編輯進度
          <Chip label={item.is_finished ? "已完成" : "未完成"} 
                style={{
                  backgroundColor: theme.palette.primary.main,
                  float: 'right'
                }} />
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="進度名稱"
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
              label={progressDetails.is_finished ? "完成時間" : "預期時間"}
              id="user_progress_date"
              />
          </LocalizationProvider>
          <br/>
          <br/>
          <TextField
            margin="dense"
            label="進度細節"
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
              label="揪團活動參與紀錄"
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
            <FormControlLabel value={false} control={<Radio />} label="未完成" />
            <FormControlLabel value={true} control={<Radio />} label="已完成" />
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">取消</Button>
          <Button onClick={handleSave} color="primary">儲存</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

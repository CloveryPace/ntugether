// 活動完整資訊
import HeaderBar from '../components/HeaderBar';
import './Common.css';

import Stack from '@mui/material/Stack';
import TextField from "@mui/material/TextField";
import * as React from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useRef } from "react";
import { useState} from "react";
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import axios from 'axios';
import { API_CREATE_ACTIVITY } from '../global/constants';
import dayjs from 'dayjs';

import { ThemeProvider } from '@mui/material/styles';
import { Typography} from '@mui/material';

import theme from '../components/Theme'; 
import Chip from '@mui/material/Chip';

const ItemComplete = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
}));


// TODO: 按新增按鈕，到活動頁面（透過活動ID）

function ProgressEdit() {
    const navigate = useNavigate();
    // read input
    // useRef()讀值方法：XXXXXXX.current?.value
    // current 後面接?，避免未輸入值時出現error
    const ActivityName = useRef(); // 活動名稱
    const ActivityIntro = useRef(); // 活動簡介
    const ApplyQues = useRef(); // 審核題目
    const ActivityTime = useRef(); // 活動時間
    const ActivityPos = useRef(); // 活動地點
    const AttendNum = useRef(); // 參加人數限制
    const SearchName = useRef(); // 輸入想邀請的人
    const [oneTime, setOneTime] = useState(true); // 一次性活動: true, 長期性活動：false
    const [review, setReview] = useState(false); // 需審核: true, 不需審核：false
    const [type, setType] = useState('運動'); // 活動類型
    const [actDate, setActDate] = useState(dayjs('2024-04-17')); 

    const [activityData, setActivityData] = useState({
        activityName: '',
        activityIntro: '',
        applyQues: '',
        activityTime: '',
        activityPos: '',
        AttendNum: '',
        inviteName: '',
        oneTime: '',
        type: '',
        review: ''

      })
    const handleChange = e => {
        const { name, value } = e.target;
        // console.log("handleChange")

        // console.log(name);
        // console.log(value);

        // console.log(activityData)

        setActivityData(prevState => ({
            ...prevState,
            [name]: value
        }));

        console.log(activityData)
    };  

    const handleSubmit = (event) => {
        event.preventDefault();
        // console.log(ActivityTime.current?.value);
        // console.log("是否為一次性活動" + oneTime);
        // console.log("是否需要審核" + review);
        // console.log("活動類型: " + type);
        console.log(activityData);

        axios.post(API_CREATE_ACTIVITY, activityData)
          .then(function (response) {
            console.log(response);
            alert('新增成功(*´∀`)~♥');
            navigate('/activitylist');
          })
          .catch(function (error) {
            console.log(error);
          });
    };

    const handleOneTimeChange = (event) => {
        setOneTime(event.target.value);
        handleChange(event);
    };

    const handleChangeReview = (event) => {
        setReview(event.target.value);
        handleChange(event);
    };

    const handleChangeType = (event) => {
        setType(event.target.value);
        handleChange(event);
    };

    const handleChangeDate = (dateData) => {
        console.log(dateData);
        setActDate(dateData);
        let finaldate = dateData.year() + '/'  + (dateData.month() + 1)+ '/' + dateData.date();
        const event = { 
            "target": {
                "value": finaldate,
                "name": "activityTime"
            }
        };
        handleChange(event);

    };

  return (
    <ThemeProvider theme={theme}>
     <HeaderBar />
        <div className='Main'>

            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <Stack direction="row" spacing={2} justifyContent="space-between" sx={{marginBottom: '10px'}}>
                    <Typography variant="h4">編輯進度</Typography>
                    <Chip sx={{ bgcolor: theme.palette.primary.main}} label="已完成"/>
                </Stack>

                <Typography variant="h6">進度名稱</Typography>
                    <Typography>算數學兩小時</Typography>

                    <Typography variant="h6"> 進度完成日期 </Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
                        <DatePicker
                        value={actDate}
                        onChange={handleChangeDate}
                        name="activityTime"
                        required
                        fullWidth
                        label="輸入進度完成日期"
                        id="activityTime"
                        />
                    </LocalizationProvider>

                    <Typography variant="h6"> 進度細節 </Typography>
                    <TextField
                        variant="outlined"
                        value={activityData.activityIntro}
                        onChange={handleChange}
                        name="activityIntro"
                        autoFocus
                        fullWidth
                        label="輸入進度細節"
                    />
                    <Typography variant="h6"> 揪團活動參與紀錄 </Typography>
                    <TextField
                        variant="outlined"
                        value={activityData.activityIntro}
                        onChange={handleChange}
                        name="activityIntro"
                        autoFocus
                        fullWidth
                        label="輸入揪團活動參與紀錄"
                    />

                    <Typography variant="h6"> 完成狀態 </Typography>
                    <RadioGroup aria-label="review" name="review" sx={{ flexDirection: 'row', gap: 2 }} onChange={handleChangeReview} defaultValue="已完成">
                        {['未完成', '已完成'].map((value) => (
                        <Grid item>
                            <ItemComplete> 
                                <FormControlLabel
                                    value={value === "已完成"}
                                    control={<Radio />}
                                    label={`${value}`}
                                    labelPlacement="end"
                                />
                            </ItemComplete>
                        </Grid>
                        ))}
                    </RadioGroup>

                    <Grid container justifyContent="center" sx={{mt: 2,}}>
                        <Grid item>
                            <Stack direction="row" spacing={2}>
                                <Button variant="contained" type="submit" color="primary" onClick={handleSubmit}> 儲存 </Button>
                                <Button variant="contained" color="error" onClick={() => navigate('/activitylist')}> 取消 </Button>
                            </Stack>
                        </Grid>
                    </Grid>
            
            </Box>
        </div>
    </ThemeProvider>
  );
}

export default ProgressEdit;
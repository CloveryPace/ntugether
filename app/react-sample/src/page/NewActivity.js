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
import { API_CREATE_ACTIVITY, API_LOGIN } from '../global/constants';
import dayjs from 'dayjs';
import { ThemeProvider } from '@mui/material/styles';
import { Typography} from '@mui/material';
import theme from '../components/Theme'; 

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

// TODO: 按新增按鈕，到活動頁面（透過活動ID）

function NewActivity() {
    const navigate = useNavigate();

    // read input
    // useRef()讀值方法：XXXXXXX.current?.value
    // current 後面接?，避免未輸入值時出現error
    const ActivityName = useRef(); // 活動名稱
    const ActivityIntro = useRef(); // 活動簡介
    const ApplyQues = useRef(); // 審核題目
    const ActivityTime = useRef(); // 活動時間
    const ActivityPos = useRef(); // 活動地點
    const max_participants = useRef(); // 參加人數限制
    const SearchName = useRef(); // 輸入想邀請的人
    const [oneTime, setOneTime] = useState(true); // 一次性活動: true, 長期性活動：false
    const [need_review, setReview] = useState(false); // 需審核: true, 不需審核：false
    const [type, setType] = useState('運動'); // 活動類型
    const [actDate, setActDate] = useState(dayjs('2024-05-30')); 
    const [Token, setToken] = useState('')

    const [activityData, setActivityData] = useState({
        name: '',
        introduction: '',
        date: '',
        inviteName: '',
        oneTime: '',
        type: '',
        need_review: '',
        country: "Taiwan",
        max_participants: '',
        location: '',
        application_problem: ''
      })

    const handleChange = e => {
        const { name, value } = e.target;
        setActivityData(prevState => ({
            ...prevState,
            [name]: value
        }));
        console.log(activityData)
    };  

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(activityData);
        
        //登入
        axios.post(API_LOGIN, {
            "email": "r12725066@ntu.edu.tw",
            "password": "a"
        })
        .then(function (response) {
            console.log(response.status, response.data);
            //儲存token
            const token = response.data.jwtToken;
            setToken(response.data.jwtToken);

            //設定authorization
            const bodyParameters = {
                key: "value",
                activityData
            };
            const config = {bodyParameters,
                headers: { "authorization": `Bearer ${token}`},
                activityData
            };

            //建立活動
            axios.post(API_CREATE_ACTIVITY, bodyParameters.activityData, config)
                .then(function (res) {
                    console.log(res);
                    alert('成功(*´∀`)~♥');
                    navigate('/activitylist');
                })
                .catch(function (err) {
                    alert("新增失敗");
                    console.log(err);
            });
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
                "name": "date"
            }
        };
        handleChange(event);
    };

  return (
    <ThemeProvider theme={theme}>
     <HeaderBar />
        <div className='Main'>

            <Stack direction="row" spacing={2}>
                <Typography variant="h4">新增活動</Typography>
            </Stack>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <Grid container spacing={10}>
                <Grid item xs={12} md={6}>
                <Typography variant="h6">活動名稱</Typography>
                    <TextField
                        variant="outlined"
                        value={activityData.name}
                        onChange={handleChange}
                        name="name"
                        autoFocus
                        fullWidth
                        label="輸入活動名稱"
                    />
                    <Typography variant="h6"> 活動簡介 </Typography>
                    <TextField
                        variant="outlined"
                        value={activityData.introduction}
                        onChange={handleChange}
                        name="introduction"
                        autoFocus
                        fullWidth
                        label="輸入活動簡介"
                    />
                    <Typography variant="h6"> 一次性活動 </Typography>
                    <RadioGroup aria-label="onetime" name="oneTime" sx={{ flexDirection: 'row', gap: 2 }} onChange={handleOneTimeChange} defaultValue="一次性活動">
                        {['一次性活動', '長期性活動'].map((value) => (
                        <Grid item>
                            <ItemOneTime> 
                                <FormControlLabel
                                    value={value === "一次性活動"}
                                    control={<Radio />}
                                    label={`${value}`}
                                    labelPlacement="end"
                                />
                            </ItemOneTime>
                        </Grid>
                        ))}
                    </RadioGroup>
                    <Typography variant="h6"> 加入審核 </Typography>
                    <RadioGroup aria-label="need_review" name="need_review" sx={{ flexDirection: 'row', gap: 2 }} onChange={handleChangeReview} defaultValue="不需審核">
                        {['需審核', '不需審核'].map((value) => (
                        <Grid item>
                            <ItemReview> 
                                <FormControlLabel
                                    value={value === "需審核"}
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
                        value={activityData.application_problem}
                        onChange={handleChange}
                        name="application_problem"
                        fullWidth
                        variant="outlined"
                        autoFocus
                        label="輸入審核題目"
                    />
                    <Typography variant="h6"> 活動類型 </Typography>
                    <RadioGroup aria-label="type" name="type" sx={{ flexDirection: 'row', gap: 2 }} onChange={handleChangeType} defaultValue="運動">
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
                </Grid>

                <Grid item xs={12} md={6}>
                    <Typography variant="h6"> 活動時間 </Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
                        <DatePicker
                        value={actDate}
                        onChange={handleChangeDate}
                        name="date"
                        required
                        fullWidth
                        label="輸入活動時間"
                        id="date"
                        />
                    </LocalizationProvider>
                    <Typography variant="h6"> 活動地點 </Typography>
                    <TextField
                        fullWidth
                        value={activityData.location}
                        onChange={handleChange}
                        name="location"
                        variant="outlined"
                        autoFocus
                        label="輸入活動地點"
                    />
                    <Typography variant="h6"> 人數上限 </Typography>
                    <TextField
                        fullWidth
                        value={activityData.max_participants}
                        onChange={handleChange}
                        name="max_participants"
                        variant="outlined"
                        autoFocus
                        label="輸入人數上限"
                    />
                    <Typography variant="h6"> 邀請加入 </Typography>
                    <TextField
                        fullWidth
                        inputRef={SearchName}
                        variant="outlined"
                        autoFocus
                        label="邀請..."
                    />
                </Grid>
            </Grid>
            <Grid container justifyContent="center">
              <Grid item>
                <Stack direction="row" spacing={2}>
                    <Button variant="contained" type="submit" color="primary" onClick={handleSubmit}> 新增 </Button>
                    <Button variant="contained" color="error" onClick={() => navigate('/activitylist')}> 取消 </Button>
                </Stack>
              </Grid>
            </Grid>
            </Box>
        </div>
    </ThemeProvider>
  );
}

export default NewActivity;
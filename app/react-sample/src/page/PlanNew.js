import HeaderBar from '../components/HeaderBar';
import AddProgress from '../components/AddProgress';
import { getAuthToken } from '../utils';
import { API_CREATE_PLAN } from '../global/constants';

import './Common.css';
import theme from '../components/Theme'; 

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
import dayjs from 'dayjs';
import { ThemeProvider } from '@mui/material/styles';
import { Typography} from '@mui/material';
import { Divider } from '@mui/material';

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

function PlanNew() {

    const navigate = useNavigate();

    const SearchName = useRef(); // 輸入想邀請的人
    const [need_reviewed, setReview] = useState('false'); // 需審核: true, 不需審核：false
    const [tags, setTags] = useState(['Exercise']); // 活動類型
    const [startDate, setStartDate] = useState(null); 
    const [endDate, setEndDate] = useState(null); 
    const [userToken, setUserToken] = useState(getAuthToken());


    const [planData, setPlanData] = useState({
        name: '',
        goal: '',
        tags: ['Exercise'],
        introduction: '',
        // create_user: '', // ?
        progression: '', // ?
        start_date: '',
        end_date: '',
        need_reviewed: 'false',
        application_problem: '',
        invitees: [],
        // discussion: '', // ?
    });

    const handleChange = e => {
        const { name, value } = e.target;

        setPlanData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(planData);

        if (!startDate || !endDate) {
            alert('請選擇開始日期和結束日期！');
            return; 
        }
        
        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);
        
        if (startDateObj > endDateObj) {
            alert('開始日期必須早於結束日期！');
            return;
        }

        const token = userToken;

        //設定authorization
        const bodyParameters = {
            key: "value",
            planData
        };
        const config = {bodyParameters,
            headers: { "authorization": `Bearer ${token}`}
        };

        //建立計畫
        axios.post(API_CREATE_PLAN, bodyParameters.planData, config)
        .then(function (res) {
            console.log(res);
            alert('成功(*´∀`)~♥');
            navigate('/planList');
        })
        .catch(function (err) {
            alert("新增失敗");
            console.log(err);
        });
    };

    const handleChangeReview = (event) => {
        setReview(event.target.value);
        handleChange(event);
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
        setPlanData(prevState => ({
            ...prevState,
            tags: [englishTag]
        }));
    };
    

    const handleChangeStartDate = (dateData) => {
        console.log(dateData);
        setStartDate(dateData);
        let finaldate = dateData.year() + '/'  + (dateData.month() + 1)+ '/' + dateData.date();
        const event = { 
            "target": {
                "value": finaldate,
                "name": "start_date"
            }
        };
        handleChange(event);

    };

    const handleChangeEndDate = (dateData) => {
        console.log(dateData);
        setEndDate(dateData);
        let finaldate = dateData.year() + '/'  + (dateData.month() + 1)+ '/' + dateData.date();
        const event = { 
            "target": {
                "value": finaldate,
                "name": "end_date"
            }
        };
        handleChange(event);

    };

    const handleProgressChange = (items) => {
        const progressEvent = { 
            "target": {
                "value": items,
                "name": "progression"
            }
        };
        handleChange(progressEvent);
    };

    return (
        <ThemeProvider theme={theme}>
        <HeaderBar />
            <div className='Main'>

                <Stack direction="row" spacing={2}>
                    <Typography variant="h4"> 新增進度計畫 </Typography>
                </Stack>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <Grid container spacing={10}>
                    <Grid item xs={12} md={6}>
                    <Typography variant="h6">計畫名稱</Typography>
                        <TextField
                            variant="outlined"
                            value={planData.name}
                            onChange={handleChange}
                            name="name"
                            autoFocus
                            fullWidth
                            label="輸入計畫名稱"
                            required
                        />
                        <Typography variant="h6"> 計畫目標 </Typography>
                        <TextField
                            variant="outlined"
                            value={planData.goal}
                            onChange={handleChange}
                            name="goal"
                            autoFocus
                            fullWidth
                            label="輸入計畫目標"
                            required
                        />
                        <Typography variant="h6"> 計畫簡介 </Typography>
                        <TextField
                            variant="outlined"
                            value={planData.introduction}
                            onChange={handleChange}
                            name="introduction"
                            autoFocus
                            fullWidth
                            label="輸入計畫簡介"
                            required
                        />
                        <Typography variant="h6"> 計畫日期 </Typography>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                            value={startDate}
                            onChange={handleChangeStartDate}
                            name="start_date"
                            required
                            fullWidth
                            label="輸入計畫開始日期"
                            id="start_date"
                            sx={{ mb: '20px' }}
                            />
                        </LocalizationProvider>
                        <span style={{ marginLeft: '20px', marginRight: '20px'}}> </span>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                            value={endDate}
                            onChange={handleChangeEndDate}
                            name="end_date"
                            required
                            fullWidth
                            label="輸入計畫結束日期"
                            id="end_date"
                            />
                        </LocalizationProvider>

                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Typography variant="h6"> 加入審核 </Typography>
                        <RadioGroup aria-label="need_reviewed" name="need_reviewed" sx={{ flexDirection: 'row', gap: 2 }} onChange={handleChangeReview} defaultValue="不需審核">
                            {['需審核', '不需審核'].map((value) => (
                            <Grid item key={value}>
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
                            value={planData.application_problem}
                            onChange={handleChange}
                            name="application_problem"
                            fullWidth
                            variant="outlined"
                            autoFocus
                            label="輸入審核題目"
                        />
                        <Typography variant="h6"> 計畫類型 </Typography>
                        <RadioGroup aria-label="tags" name="tags" sx={{ flexDirection: 'row', gap: 2 }} onChange={handleChangeTags} defaultValue="運動">
                            {['運動', '學習', "考試"].map((value) => (
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
                <Divider sx={{my: 4,}}/>
                <Typography variant="h6"> 進度項目 </Typography>
                <AddProgress onProgressChange={handleProgressChange} />
                <Divider sx={{my: 4,}}/>
                <Grid container justifyContent="center">
                  <Grid item>
                    <Stack direction="row" spacing={2}>
                        <Button variant="contained" type="submit" color="primary" onClick={handleSubmit}> 新增 </Button>
                        <Button variant="contained" color="error" onClick={() => navigate('/planList')}> 取消 </Button>
                    </Stack>
                  </Grid>
                </Grid>
                </Box>
            </div>
        </ThemeProvider>
    );
}

export default PlanNew;

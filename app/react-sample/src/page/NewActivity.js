// 活動完整資訊
import HeaderBar from '../components/HeaderBar';
import './Common.css';
import Stack from '@mui/material/Stack';
import TextField from "@mui/material/TextField";
import * as React from 'react';
import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker';
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
import { API_CREATE_ACTIVITY } from '../global/constants';
import { ThemeProvider } from '@mui/material/styles';
import { Typography, IconButton } from '@mui/material';
import theme from '../components/Theme'; 
import { getAuthToken } from '../utils';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

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

function NewActivity() {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();

    // read input
    // useRef()讀值方法：XXXXXXX.current?.value
    // current 後面接?，避免未輸入值時出現error
    const SearchName = useRef(); // 輸入想邀請的人
    const [userToken, setUserToken] = useState(getAuthToken());

    // 長期性活動多個時間
    const [dateitems, setDateitems] = useState([""]);
    const handleAddClick = () => {
        var newdateItems = [...dateitems];
        newdateItems[newdateItems.length] = "";
        setDateitems(newdateItems);
        const event = { 
            "target": {
                "value": newdateItems,
                "name": "date"
            }
        };
        handleChange(event);
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
        setDateitems(newdateItems);
        const event = { 
            "target": {
                "value": newdateItems,
                "name": "date"
            }
        };
        handleChange(event);
      };

    const [activityData, setActivityData] = useState({
        name: '',
        introduction: '',
        date: [""],
        inviteName: '',
        is_one_time: '',
        type: '',
        need_reviewed: '',
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
        console.log("活動");
        console.log(activityData);
        console.log("時間array");
        console.log(activityData.date);
    };  

    const createActivity = (event) =>{
        event.preventDefault();
        const data = {
            "name": activityData.name,
            "introduction": activityData.introduction,
            "date": activityData.date,
            "need_reviewed": activityData.need_reviewed,
            "country": "Taiwan",
            "max_participants": activityData.max_participants,
            "location": activityData.location,
            "application_problem": activityData.application_problem,
            "is_one_time": (activityData.is_one_time === "true"),
            "type": activityData.type,
        };
        console.log(data);

        const token = userToken;
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "authorization": `bearer ${token}`,
            },
            body: JSON.stringify(data),
        };
        fetch(API_CREATE_ACTIVITY, requestOptions)
            .then(response => {
                if (!response.ok) {
                    console.log(response.status);
                    alert("新增失敗");
                    throw new Error('response was not ok');
                }
                alert('成功(*´∀`)~♥');
                navigate('/activitylist');
                return response.json();
            })
            .then(data => {
                var data = JSON.stringify(data, null, 2);
                console.log(data);
            })
            .catch(error => {
                console.error
                    ('Error:', error);
            });
    } 

    useEffect(() => {
    if (activityData.is_one_time === "true"){
        if (Array.isArray(activityData.date)){
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
    }, [activityData.is_one_time]);


    /*
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(activityData);
        const token = userToken;
        /*
        const bodyParameters = {
            key: "value",
            'Content-Type': 'application/json',
        };
        const config = {bodyParameters,
            headers: { 
                'Content-Type': 'application/json',
                "authorization": `Bearer ${token}`
            }
        };
       
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "authorization": `bearer ${token}`,
            },
            body: JSON.stringify(activityData),
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
    };
 */

    const handleOneTimeChange = (event) => {
        handleChange(event);
    };
    const handleChangeReview = (event) => {
        handleChange(event);
    };
    const handleChangeType = (event) => {
        handleChange(event);
    };

  return (
    <ThemeProvider theme={theme}>
     <HeaderBar />
        <div className='Main'>

            <Stack direction="row" spacing={2}>
                <Typography variant="h4"> {t("新增活動")}</Typography>
            </Stack>
            <Box component="form" noValidate onSubmit={createActivity} sx={{ mt: 1 }}>
            <Grid container spacing={10}>
                <Grid item xs={12} md={6}>
                <Typography variant="h6">{t("活動名稱")}</Typography>
                    <TextField
                        variant="outlined"
                        value={activityData.name}
                        onChange={handleChange}
                        name="name"
                        autoFocus
                        fullWidth
                        label={t("輸入活動名稱")}
                    />
                    <Typography variant="h6"> {t("新增簡介")} </Typography>
                    <TextField
                        variant="outlined"
                        value={activityData.introduction}
                        onChange={handleChange}
                        name="introduction"
                        autoFocus
                        fullWidth
                        label={t("輸入活動簡介")}
                    />
                    <Typography variant="h6"> {t("一次性活動")} </Typography>
                    <RadioGroup aria-label="is_one_time" name="is_one_time" sx={{ flexDirection: 'row', gap: 2 }} onChange={handleOneTimeChange} defaultValue="一次性活動">
                        {['一次性活動', '長期性活動'].map((value) => (
                        <Grid item>
                            <ItemOneTime> 
                                <FormControlLabel
                                    value={value === "一次性活動"}
                                    control={<Radio />}
                                    label={t(`${value}`)}
                                    labelPlacement="end"
                                />
                            </ItemOneTime>
                        </Grid>
                        ))}
                    </RadioGroup>
                    <Typography variant="h6"> {t("加入審核")} </Typography>
                    <RadioGroup aria-label="need_reviewed" name="need_reviewed" sx={{ flexDirection: 'row', gap: 2 }} onChange={handleChangeReview} defaultValue="不需審核">
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
                        value={activityData.application_problem}
                        onChange={handleChange}
                        name="application_problem"
                        fullWidth
                        variant="outlined"
                        autoFocus
                        label={t("輸入審核題目")}
                    />
                    <Typography variant="h6"> {t("活動類型")} </Typography>
                    <RadioGroup aria-label="type" name="type" sx={{ flexDirection: 'row', gap: 2 }} onChange={handleChangeType}>
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
                </Grid>

                <Grid item xs={12} md={6}>
                    <Stack direction="row" spacing={2}>
                        <Typography variant="h6"> {t("活動時間")} </Typography>
                        {(activityData.is_one_time === "true")?
                        <></>
                        :
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                        <Button variant="contained" color="primary" onClick={handleAddClick}> + </Button>
                        </Box>
                        }

                    </Stack>
                    {dateitems.map((item, index) => (
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
                            {dateitems.length > 1 && (
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
                    <Typography variant="h6"> {t("活動地點")} </Typography>
                    <TextField
                        fullWidth
                        value={activityData.location}
                        onChange={handleChange}
                        name="location"
                        variant="outlined"
                        autoFocus
                        label={t("輸入活動地點")}
                    />
                    <Typography variant="h6"> {t("人數上限")} </Typography>
                    <TextField
                        fullWidth
                        value={activityData.max_participants}
                        onChange={handleChange}
                        name="max_participants"
                        variant="outlined"
                        autoFocus
                        label={t("輸入人數上限")}
                    />
                </Grid>
            </Grid>
            <Typography variant="h6"> </Typography>
            <Grid container justifyContent="center">
              <Grid item>
                <Stack direction="row" spacing={2}>
                    <Button variant="contained" type="submit" color="primary" onClick={createActivity}> {t("新增")} </Button>
                    <Button variant="contained" color="error" onClick={() => navigate('/activitylist')}> {t("取消")} </Button>
                </Stack>
              </Grid>
            </Grid>
            </Box>
        </div>
    </ThemeProvider>
  );
}

export default NewActivity;
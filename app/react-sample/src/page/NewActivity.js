// 活動完整資訊

import Stack from '@mui/material/Stack';
import TextField from "@mui/material/TextField";
import { blue, yellow, orange } from '@mui/material/colors';
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

const ItemOneTime = styled(Paper)(({ theme }) => ({
  backgroundColor: yellow[400],
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const ItemReview = styled(Paper)(({ theme }) => ({
    backgroundColor: orange[400],
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const ItemTag = styled(Paper)(({ theme }) => ({
    backgroundColor: blue[100],
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function NewActivity() {

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
    const [type, setType] = useState(false); // 需審核: true, 不需審核：false

    const style = { 
        padding: "5rem 5rem 10rem 10rem",
    };
    const style2 = { 
        padding: "3rem 5rem 0 0",
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(ActivityTime.current?.value);
        console.log("是否為一次性活動" + oneTime);
        console.log("是否需要審核" + review);
        console.log("活動類型: " + type);
    };

    const handleChange = (event) => {
        event.persist();
        setOneTime(event.target.value);
    };

    const handleChangeReview = (event) => {
        event.persist();
        setReview(event.target.value);
    };

    const handleChangeType = (event) => {
        event.persist();
        setType(event.target.value);
    };

  return (
    <div>
        <div style={style}>

            <Stack direction="row" spacing={2}>
                <h1> 新增活動 </h1> 
            </Stack>

            <Grid container spacing={10}>
                <Grid item xs={6}>
                    <h4> 活動名稱 </h4>
                    <TextField
                        inputRef={ActivityName}
                        variant="outlined"
                        autoFocus
                        fullWidth
                        label="輸入活動名稱"
                    />
                    <h4> 活動簡介 </h4>
                    <TextField
                        inputRef={ActivityIntro}
                        variant="outlined"
                        autoFocus
                        fullWidth
                        label="輸入活動簡介"
                    />
                    <h4> 一次性活動 </h4>
                    <RadioGroup aria-label="onetime" name="onetime" sx={{ flexDirection: 'row', gap: 2 }} onChange={handleChange} defaultValue="一次性活動">
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
                    <h4> 需審核 </h4>
                    <RadioGroup aria-label="review" name="review" sx={{ flexDirection: 'row', gap: 2 }} onChange={handleChangeReview} defaultValue="不需審核">
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
                    <h4> </h4>
                    <TextField
                        inputRef={ApplyQues}
                        fullWidth
                        variant="outlined"
                        autoFocus
                        label="輸入審核題目"
                    />
                    <h4> 活動類型 </h4>
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

                <Grid item xs={6}>
                    <h3> 📅 </h3>
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
                        <DatePicker
                        inputRef={ActivityTime}
                        required
                        fullWidth
                        label="輸入活動時間"
                        id="date"
                        />
                    </LocalizationProvider>
                    <h3> 📍 </h3>
                    <TextField
                        fullWidth
                        inputRef={ActivityPos}
                        variant="outlined"
                        autoFocus
                        label="輸入活動地點"
                    />
                    <h4> 人數上限 </h4>
                    <TextField
                        fullWidth
                        inputRef={AttendNum}
                        variant="outlined"
                        autoFocus
                        label="輸入人數上限"
                    />
                    <h4> 邀請加入 </h4>
                    <TextField
                        fullWidth
                        inputRef={SearchName}
                        variant="outlined"
                        autoFocus
                        label="邀請..."
                    />
                </Grid>
            </Grid>
            <Grid container justifyContent="center" style={style2}>
              <Grid item>
                <Stack direction="row" spacing={2}>
                    <Button variant="contained" color="primary" onClick={handleSubmit}> 新增 </Button>
                    <Button variant="contained" color="error"> 取消 </Button>
                </Stack>
              </Grid>
            </Grid>
        </div>
    </div>
  );
}

export default NewActivity;
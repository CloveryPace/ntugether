// 活動完整資訊

import Stack from '@mui/material/Stack';
import TextField from "@mui/material/TextField";
import Chip from '@mui/material/Chip';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { cyan, yellow, orange } from '@mui/material/colors';
import * as React from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useRef } from "react";

const tagTheme = createTheme({
    palette: {
      primary: {
        main: yellow[400],
      },
      secondary:{
        main: cyan[100],
      },
      warning:{
        main: orange[400]
      }
    },
});

function NewActivity() {

    // read input
    const ActivityName = useRef();
    const ActivityIntro = useRef();
    const ApplyQues = useRef();
    const ActivityTime = useRef();
    const ActivityPos = useRef();
    const AttendNum = useRef();
    const SearchName = useRef();

    const style = { 
        padding: "5rem 5rem 10rem 10rem",
    };
    const style2 = { 
        padding: "3rem 5rem 0 0",
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(ActivityTime.current.value);
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
                    <Stack direction="row" spacing={1}>
                        <ThemeProvider theme={tagTheme}>
                            <Chip color="primary" label="一次性"/>
                            <Chip color="primary" label="長期性活動"/>
                        </ThemeProvider>
                    </Stack>
                    <h4> 需審核 </h4>
                    <Stack direction="row" spacing={1}>
                        <ThemeProvider theme={tagTheme}>
                            <Chip color="warning" label="需審核"/>
                            <Chip color="warning" label="不需審核"/>
                        </ThemeProvider>
                    </Stack>
                    <h4> </h4>
                    <TextField
                        inputRef={ApplyQues}
                        fullWidth
                        variant="outlined"
                        autoFocus
                        label="輸入審核題目"
                    />
                    <h4> 活動類型 </h4>
                    <Stack direction="row" spacing={1}>
                        <Chip color="primary" label="運動"/>
                        <Chip color="primary" label="讀書會"/>
                    </Stack>
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
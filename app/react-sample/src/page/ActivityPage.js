// 活動完整資訊

import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { cyan, yellow, orange } from '@mui/material/colors';
import { Divider, Grid, Paper } from "@material-ui/core";
import TextField from "@mui/material/TextField";

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

function ActivityPage() {
  const style = { 
    padding: "5rem 0 10rem 10rem",
  };
  const style2 = { 
    padding: "1rem 0 0 0" 
  };
  const instyle = { 
    padding: "3rem 0 0 0" 
  };

  return (
    <div style={style}>

      <Stack direction="row" spacing={2}>
        <h2> 活動名稱 </h2> 
        <Chip avatar={<Avatar>M</Avatar>} label="創建者 名稱" />
        <ThemeProvider theme={tagTheme}>
          <Chip color="secondary" label="type"/>
        </ThemeProvider>
        <ThemeProvider theme={tagTheme}>
          <Chip color="primary" label="一次性"/>
        </ThemeProvider>
        <ThemeProvider theme={tagTheme}>
          <Chip color="warning" label="需審核"/>
        </ThemeProvider>
        <Button variant="contained" color="primary"> 編輯活動 </Button> 
      </Stack>

      <Stack direction="row" spacing={1.5} style={style2}>
        <h3> 活動簡介 </h3>
      </Stack>

      <Stack direction="row" spacing={10} style={style2}>
        <Stack direction="column" spacing={3} style={instyle}>
          <Stack direction="row" spacing={10} style={style2}> 
            <h4> 📅 </h4>
          </Stack>
          <Stack direction="row" spacing={6} style={style2}> 
            <h4> 📍 </h4>
          </Stack>
          <Stack direction="row" spacing={6} style={style2}> 
            <h4> 人數上限 </h4>
          </Stack>
          <Stack direction="row" spacing={7} style={style2}> 
            <h4> 參加者 </h4>
          </Stack>
          <Stack direction="row" spacing={7} style={style2}> 
            <h4> 討論串 </h4>
          </Stack>
        </Stack>
        <Stack direction="column" spacing={3} style={instyle}>
          <Stack direction="row" spacing={10} style={style2}> 
            <h4> 2024/01/01 20:00 </h4>
          </Stack>
          <Stack direction="row" spacing={10} style={style2}> 
            <h4> 台大門口 </h4>
          </Stack>
          <Stack direction="row" spacing={10} style={style2}> 
            <h4> 5 </h4>
          </Stack>
          <Stack direction="row" spacing={7} style={style2}> 
          <Avatar alt="Remy Sharp"/>
          </Stack>
          <Paper style={{ padding: "30px 30px", width: "50rem" }}>
            <Grid container wrap="nowrap" spacing={2}>
              <Grid item>
                <Avatar alt="Remy Sharp"/>
              </Grid>
              <Grid justifyContent="left" item xs zeroMinWidth>
                <h4 style={{ margin: 0, textAlign: "left" }}> name </h4>
                <p style={{ textAlign: "left" }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                  luctus ut est sed faucibus. Duis bibendum ac ex vehicula laoreet.
                  Suspendisse congue vulputate lobortis. Pellentesque at interdum
                  tortor. Quisque arcu quam, malesuada vel mauris et, posuere
                  sagittis ipsum. Aliquam ultricies a ligula nec faucibus.{" "}
                </p>
              </Grid>
            </Grid>
          <Divider variant="fullWidth" style={{ margin: "20px 0" }} />
            <Grid container wrap="nowrap" spacing={2}>
                <Grid item>
                  <Avatar alt="Remy Sharp"/>
                </Grid>
                <Grid justifyContent="left" item xs zeroMinWidth>
                  <h4 style={{ margin: 0, textAlign: "left" }}> name </h4>
                  <p style={{ textAlign: "left" }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                    luctus ut est sed faucibus. Duis bibendum ac ex vehicula laoreet.
                    Suspendisse congue vulputate lobortis. Pellentesque at interdum
                    tortor. Quisque arcu quam, malesuada vel mauris et, posuere
                    sagittis ipsum. Aliquam ultricies a ligula nec faucibus.{" "}
                  </p>
                </Grid>
            </Grid>
          <Divider variant="fullWidth" style={{ margin: "10px 0" }} />
            <Grid container wrap="nowrap" spacing={2}>
                <Grid item>
                  <Avatar alt="Remy Sharp"/>
                </Grid>
                <Grid justifyContent="left" item xs zeroMinWidth>
                  <h4 style={{ margin: 0, textAlign: "left" }}> name </h4>
                  <TextField
                    fullWidth
                    variant="outlined"
                    sx={{ mt: 1}}
                    autoFocus
                    label="Add comment"
                  />
                </Grid>
            </Grid>
          </Paper>   
        </Stack>
      </Stack>

      <div style={instyle}>
      </div>

    </div>
  );
}

export default ActivityPage;
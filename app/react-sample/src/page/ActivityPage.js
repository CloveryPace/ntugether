// 活動完整資訊

import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { Divider, Grid, Paper } from "@material-ui/core";

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
        <Chip color="primary" label="type"/>
        <Chip color="primary" label="一次性"/>
        <Chip color="primary" label="需審核"/>
        <Button variant="contained" color="primary"> 編輯活動 </Button>
      </Stack>

      <Stack direction="row" spacing={1.5} style={style2}>
        <h3> 活動簡介 </h3>
      </Stack>

      <Stack direction="row" spacing={50} style={style2}>
        <Stack direction="column" spacing={2} style={instyle}>
          <Stack direction="row" spacing={10} style={style2}> 
            <h4> 📅 </h4>
          </Stack>
          <Stack direction="row" spacing={5} style={style2}> 
            <h4> 📍 </h4>
          </Stack>
          <Stack direction="row" spacing={5} style={style2}> 
            <h4> 人數上限 </h4>
          </Stack>
          <Stack direction="row" spacing={5} style={style2}> 
            <h4> 參加者 </h4>
            <Avatar alt="Remy Sharp"/>
          </Stack>
          <Stack direction="row" spacing={5} style={style2}> 
            <h4> 討論串 </h4>
            <Paper style={{ padding: "30px 20px", width: "50rem" }}>
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
            <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
            </Paper>
            </Stack>
          </Stack>
      </Stack>



      <div style={instyle}>
      </div>

    </div>
  );
}

export default ActivityPage;
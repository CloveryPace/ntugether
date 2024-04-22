// 進度計畫管理內部的項目

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';

export default function ProgressItem({data}) {
    const style = { 
      border: '1.5px solid rgba(0, 0, 0, 0.1)',
      padding: '2rem'
    };

    return (
        <Grid item xs={12} md={4}>
        <div className="box" style={style}>
          <Stack direction="column">
            
            <Stack direction="row" spacing={3}>
            <Typography variant="h5" gutterBottom> 項目名稱 </Typography>
            <Chip color="secondary" label={"需/不需要參加揪團活動"}/>
            </Stack >

            <Stack direction="column" spacing={2} sx={{ marginTop: '20px', marginBottom: '20px'}}>
            <div style={{ display: "flex", alignItems: "center" }}>
                <Typography variant="body1"> 項目介紹： </Typography>
                <Typography variant="body1"> XXXXX </Typography>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
                <Typography variant="body1"> 項目時間： </Typography>
                <Typography variant="body1"> XXXXX </Typography>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
                <Typography variant="body1"> 揪團活動連結： </Typography>
                <Typography variant="body1"> XXXXX </Typography>
            </div>
            </Stack>

            <Stack direction="row" spacing={2}>
                <Button variant="contained" color="primary"> 編輯 </Button> 
                <Button variant="contained" color="error"> 刪除 </Button> 
            </Stack>

          </Stack>
        </div>
        </Grid>
    );
}

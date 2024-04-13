import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';

import { Typography } from '@mui/material';

import {useTheme} from '@mui/material';

export default function FilterBar() {
  const theme = useTheme();

  return (
    <div>
        <Typography variant='h6'>篩選</Typography>
    <Stack
      direction="column"
      divider={<Divider orientation="horizontal" flexItem />}
      spacing={2} sx={{marginTop: '30px'}}
    >
    <Stack direction="row" spacing={2} sx={{marginBottom: '15px' }}>
    <Typography>類型</Typography>
      <Button variant="contained" color='secondary'>活動</Button> 
      <Button variant="contained" color='secondary'>進度計畫</Button> 
    </Stack>

    <Stack direction="row" spacing={2}  sx={{marginBottom: '15px' }}>
    <Typography>時間</Typography>
    <Button variant="contained" color='secondary'>今天</Button> 
    <Button variant="contained" color='secondary'>明天</Button> 
    <Button variant="contained" color='secondary'>本週</Button>
    <Button variant="contained" color='secondary'>本週末</Button>
    </Stack>

    <Stack direction="row" spacing={2}  sx={{marginBottom: '15px' }}>
    <Typography>主題</Typography>
    <Button variant="contained" color='secondary'>運動</Button> 
    <Button variant="contained" color='secondary'>讀書</Button> 
    <Button variant="contained" color='secondary'>其他</Button>
    </Stack>

    <Stack direction="row" spacing={2}  sx={{marginBottom: '15px' }}>
    <Typography>地點</Typography>
    <Button variant="contained" color='secondary'>北部</Button> 
    <Button variant="contained" color='secondary'>中部</Button> 
    <Button variant="contained" color='secondary'>南部</Button>
    <Button variant="contained" color='secondary'>東部</Button>
    </Stack>
    </Stack>
  </div>
  );
}
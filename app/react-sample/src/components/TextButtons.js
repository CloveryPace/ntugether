import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';

export default function TextButtons() {
  const navigate = useNavigate();
  return (
    <Stack direction="row" justifyContent="center" spacing={2}>
      <Button variant="contained" color='primary'>學習</Button> 
      <Button variant="contained" color='primary'>運動</Button>
      <Button variant="contained" color='primary'>其他</Button>
      <h1> </h1>
      <Button color='primary' onClick={() => navigate('/activitylist')}>
      <Typography> 查看所有活動</Typography>
      </Button>
    </Stack>
  );
}
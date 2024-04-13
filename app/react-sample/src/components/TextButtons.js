import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default function TextButtons() {

  return (
    <Stack direction="row" justifyContent="center" spacing={2}>
      <Button variant="contained" color='secondary'>學習</Button> 
      <Button variant="contained" color='secondary'>運動</Button> 
      <Button variant="contained" color='secondary'>其他</Button>
    </Stack>
  );
}
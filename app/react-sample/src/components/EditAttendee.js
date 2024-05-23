import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Stack } from '@mui/material';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useState } from "react";
import { getAuthToken } from '../utils';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function EditAttendee({ onHide, show, id, ActivityAtendee}) {
    const [userToken, setUserToken] = useState(getAuthToken());

  return (
    <div>
      <Modal
        open={show}
        onClose={onHide}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>

          <Grid container spacing={10}>
          </Grid>

          <Typography variant="h6"> </Typography>
          <Grid container justifyContent="center">
              <Grid item>
                <Stack direction="row" spacing={2}>
                    <Button variant="contained" type="submit" color="primary"> 儲存 </Button>
                    <Button variant="contained" color="error" onClick={onHide}> 取消 </Button>
                </Stack>
              </Grid>
          </Grid>

        </Box>
      </Modal>
    </div>
  );
}
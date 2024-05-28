import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function DemoAlert() {
  return (
    <AppBar position="sticky" sx={{ bottom: 0, bgcolor: '#E8ECEB', maxHeight: '64px' }}>
      <Toolbar>
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <Typography variant="h6"  >
            此網站為實驗性質，僅供展示使用
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default DemoAlert;
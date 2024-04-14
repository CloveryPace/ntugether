import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import {useTheme} from '@mui/material';

export default function Footer() {
  const theme = useTheme();
  
  return (
    <Box component="footer" sx={{ bgcolor: "third.main" , py: 12 }}>
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12} sm={2}>
              <Typography variant="h6">NTUgether</Typography>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Typography variant="h6">服務</Typography>
            <Typography>常見問題</Typography>
            <Typography>便捷服務</Typography>
            <Typography>隱私政策</Typography>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Typography variant="h6">連結</Typography>
            <Typography>合作夥伴</Typography>
            <Typography>關於我們</Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

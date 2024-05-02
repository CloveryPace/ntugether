import * as React from 'react';
import { ListItem, ListItemText, Paper } from '@mui/material';
import {useTheme} from '@mui/material';
import Button from '@mui/material/Button';
import { Box} from '@mui/material';

export default function CompletedProgressItem({ item, index }) {
  const theme = useTheme();

    return (
      <Paper elevation={3} style={{ marginBottom: '10px', padding: '10px', backgroundColor: theme.palette.primary.light}}>
        <ListItem>
          
          <ListItemText 
            primary={
                <>  
                    {"進度名稱：" + item.name} 
                    <br/>
                    {"完成時間：" + item.time}
                    <br/>
                    {"進度細節：" + item.detail}
                </>
              } />
        </ListItem>
        <div style={{ padding: 5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center'}}>
          <Button variant="contained" color="primary">編輯</Button>
        </Box>
        </div>
      </Paper>
    );
}
import * as React from 'react';
import { ListItem, ListItemText, Paper } from '@mui/material';
import {useTheme} from '@mui/material';
import Button from '@mui/material/Button';

export default function UpcomingProgressItem({ item, index }) {
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
          <Button variant="contained" color="primary">完成 / 編輯</Button>
        </div>
      </Paper>
    );
}
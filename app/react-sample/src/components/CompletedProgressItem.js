import * as React from 'react';
import { ListItem, ListItemText, Paper } from '@mui/material';
import {useTheme} from '@mui/material';
import Button from '@mui/material/Button';
import { Box} from '@mui/material';

export default function CompletedProgressItem({ item}) {
  const theme = useTheme();

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

    return (
      <Paper elevation={3} style={{ marginBottom: '10px', padding: '10px', backgroundColor: theme.palette.primary.light}}>
        <ListItem>
          
          <ListItemText 
            primary={
                <>  
                    {"進度名稱：" + item.name} 
                    <br/>
                    {"完成時間：" + formatDate(item.user_progress_date)}
                    <br/>
                    {"進度細節：" + item.description}
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
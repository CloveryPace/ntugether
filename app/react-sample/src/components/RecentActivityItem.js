import * as React from 'react';
import { ListItem, Typography, ListItemText, Paper } from '@mui/material';
import {useTheme} from '@mui/material';

function ActivityItem({ item, index }) {
  const theme = useTheme();

  return (
    <Paper key={index} elevation={3} style={{ marginBottom: '10px', padding: '10px', height: '90px', backgroundColor: theme.palette.primary.light}}>
      <ListItem>
        <ListItemText primary={item.name} 
        secondary={
            <>
                {item.date} {item.time}
                <br />
                {item.location}
            </>
          } />
      </ListItem>
    </Paper>
  );
}

export default ActivityItem;

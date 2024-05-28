import * as React from 'react';
import { ListItem, ListItemText, Paper } from '@mui/material';
import {useTheme} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function ActivityItem({ item, index }) {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Paper key={index} elevation={3} style={{ marginBottom: '10px', padding: '10px', height: '90px', backgroundColor: theme.palette.primary.light}} onClick={() => navigate('/activitypage')}>
      <ListItem>
        <ListItemText primary={item.name} 
        secondary={
            <>
                {item.date}
                <br />
                {item.location}
            </>
          } />
      </ListItem>
    </Paper>
  );
}

export default ActivityItem;

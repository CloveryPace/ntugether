import * as React from 'react';
import { ListItem, ListItemText, Paper, LinearProgress, useTheme} from '@mui/material';


function PlanAchieveItem({ item, index }) {
  const theme = useTheme();
  return (
      <Paper key={index} elevation={3} style={{ marginBottom: '10px', padding: '10px', height: '90px', backgroundColor: theme.palette.primary.light}}>
        <ListItem>
          <ListItemText primary={item.name} 
          secondary={
              <>  
                  已經達成 {item.percentage} %
                  
                  <LinearProgress variant="determinate" value={item.percentage} 
                  sx={{ 
                    height: '10px', 
                    backgroundColor: '#FFFFFF',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: theme.palette.secondary.main,
                    }
                  }}/>
              </>
            } />
        </ListItem>
      </Paper>
  );
}

export default PlanAchieveItem;

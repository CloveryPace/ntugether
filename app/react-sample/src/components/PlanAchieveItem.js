import * as React from 'react';
import { ListItem, ListItemText, Paper, LinearProgress, useTheme} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';


function PlanAchieveItem({ item, index }) {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();

  return (
      <Paper key={index} elevation={3} style={{ marginBottom: '10px', padding: '10px', height: '90px', backgroundColor: theme.palette.primary.light}} onClick={() => navigate('/planPage')}>
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



import * as React from 'react';
import { ListItem, ListItemText, Paper } from '@mui/material';
import {useTheme} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

function ActivityItem({ item, index }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  return (
    <Paper key={index} elevation={3} style={{ marginBottom: '10px', padding: '10px', height: '90px', backgroundColor: theme.palette.primary.light}} 
    onClick={
      () => {
        navigate(`/activitypage`, { state: {id: item.activity_id } });
        window.location.reload(false);
      }
      }>
      <ListItem>
        <ListItemText primary={item.name} 
        secondary={
            <>
              {Array.isArray(item.date)?
                  <>{item.date[0]? dayjs(item.date[0]).format('YYYY/MM/DD h:mm A'): t("尚無活動時間資料")}</>
                  :
                  <>{item.date? dayjs(item.date).format('YYYY/MM/DD h:mm A'): t("尚無活動時間資料")}</>
              }
              <br />
              {item.location}
            </>
          } />
      </ListItem>
    </Paper>
  );
}

export default ActivityItem;
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function NotificationList({data}) {

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>

      {
        data.length !== 0?(
          data.map((item) => {
            return <OneListItem item={item}/>
          })
        ):(
          <OneListItem item={['目前沒有通知', '', '']} />
        )
      }
    </List>
  );
}


function OneListItem({item}){
  const { t, i18n } = useTranslation();

  return (
    <div>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary={item[0] === 'application' ? t('你收到一則申請通知') : item[0] === 'invitation' ? t('你收到一則邀請通知') : t(item[0])}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {item[1]}
              </Typography>
            
              {item[0] === 'application' ? t('回答：') + item[2] :item[2]}
            </React.Fragment>
          }
        />
      </ListItem>
    </div>
  )
}
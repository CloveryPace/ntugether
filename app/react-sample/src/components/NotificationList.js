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
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { getAuthToken } from '../utils';
import axios from 'axios';
import { API_GET_ACTIVITY_DETAIL } from '../global/constants';

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
// <div onClick={() => navigate(`/activitypage`, { state: {id: data.activity_id } })} style={{cursor: 'pointer'}}>

function OneListItem({item}){
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const handleAccept = (activity_id) => { 
    const token = getAuthToken();
    const config = {
        headers: { 
          authorization: `Bearer ${token}`
        }
    }
    axios.put(API_GET_ACTIVITY_DETAIL + activity_id + '/invitation', 
    {
      "accepted": true
    },
    config)
      .then(function (res) {
          console.log(res);
          alert('成功加入活動');
          window.location.reload(false);
      })
      .catch(function (err) {
          alert("加入活動失敗");
          console.log(err);
    });
  };

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
              <p></p>
              {item[0] === 'invitation' ? 
                <>
                <Button variant="contained" onClick={() => navigate(`/activitypage`, { state: {id: item[2] } })}> {t('前往')}</Button>
                <p></p>
                <Button variant="contained" onClick={() =>handleAccept(item[2])}> {t('接受邀請')}</Button>
                </>
              :
              <></>}
              {item[0] === 'application' ? t('回答：') + item[2] :<></>}
            </React.Fragment>
          }
        />
      </ListItem>
    </div>
  )
}
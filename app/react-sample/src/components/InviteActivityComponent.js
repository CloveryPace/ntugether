import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { API_GET_USER, API_GET_ACTIVITY_DETAIL} from '../global/constants';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { getAuthToken } from '../utils';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { useTranslation } from 'react-i18next';

export default function InviteActivityComponent({activity_id, user_id}) {
    const { t, i18n } = useTranslation();
    const [users, setUsers] = useState([]);
    const component_2 = { 
      width: "10rem",
      border: '1.5px solid rgba(0, 0, 0, 0)',
      padding: '1.3rem'
  };

    useEffect(() => {
      const token = getAuthToken();
      const config = {
          headers: { 
            authorization: `Bearer ${token}`
          }
      };
      //取得活動創建者追蹤中的用戶
      axios.get(API_GET_USER + '/' + user_id + '/following', config)
        .then(function (res) {
            console.log("取得追蹤中使用者成功");
            console.log(res.data);
            setUsers(res.data);
        })
        .catch(function (err) {
          console.log(err);
          console.log("取得追蹤中使用者失敗");
        });

    }, []);

    //邀請
    const handleInvite = (user) => { 
      const token = getAuthToken();
      const config = {
          headers: { 
            authorization: `Bearer ${token}`
          }
      }; 
      axios.post(API_GET_ACTIVITY_DETAIL + activity_id + '/invitation',{ 
        "invitees": [user]
      }, config)
        .then(function (res) {
            console.log(res);
            alert('送出邀請成功');
        })
        .catch(function (err) {
            alert("送出邀請失敗");
            console.log(err);
      });
    };

    return (
        <List
            sx={{
            width: '100%',
            maxWidth: 360,
            bgcolor: 'background.paper',
            position: 'relative',
            overflow: 'auto',
            maxHeight: 300,
            '& ul': { padding: 0 },
            }}
            subheader={<li />}
        >
            {users ?
            (users.map((user) => {
            return (
                <>
                <ListItem component="div" disablePadding>
                    <ListItemAvatar>
                        <Avatar> {user.Following.name[0]? user.Following.name[0]: "未知"} </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={user.Following.name? user.Following.name: "未知"}/>
                    <Button variant="contained" color="primary" onClick={() =>handleInvite(user.followingId)}> {t("邀請")} </Button> 
                </ListItem>
                <br/>
                </>
            );
            })):
            <div style = {component_2}>
                {t("尚無追蹤中使用者")}
            </div>
            }
        </List>
    );
}
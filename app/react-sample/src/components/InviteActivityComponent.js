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

export default function InviteActivityComponent({activity_id}) {
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
      //取得使用者們
      axios.get(API_GET_USER + '/allMembers', config)
        .then(function (res) {
            console.log("取得所有使用者成功");
            console.log(res.data.members);
            setUsers(res.data.members);
        })
        .catch(function (err) {
          console.log(err);
          console.log("取得所有使用者失敗");
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
            {users.length > 0 ?
            (users.map((user) => {
            return (
                <>
                <ListItem component="div" disablePadding>
                    <ListItemAvatar>
                        <Avatar> {user.name[0]? user.name[0]: "未知"} </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={user.name? user.name: "未知"}/>
                    <Button variant="contained" color="primary" onClick={() =>handleInvite(user.user_id)}> {t("邀請")} </Button> 
                </ListItem>
                <br/>
                </>
            );
            })):
            <div style = {component_2}>
                {t("尚無使用者資料")}
            </div>
            }
        </List>
    );
}
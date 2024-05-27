// 活動資訊方塊 

import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import ScheduleIcon from '@mui/icons-material/Schedule';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PeopleIcon from '@mui/icons-material/People';
import { Grid } from '@mui/material';
import dayjs from 'dayjs';
import AvatarGroup from '@mui/material/AvatarGroup';

// 頭像顏色根據名字變化
function stringToColor(string) {
  let hash = 0;
  let i;
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
}
function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name[0]}`,
  };
}

export default function ActivityComponent({data}) {
    const navigate = useNavigate();
    const style = { 
      border: '1.5px solid rgba(0, 0, 0, 0.1)',
      padding: '2rem'
    };

    return (
        <Grid item xs={12} md={4}>
        <div className="box" style={style}>
          <Stack direction="column">
            <div onClick={() => navigate(`/activitypage`, { state: {id: data.activity_id } })} style={{cursor: 'pointer'}}>
            <Typography variant="h5" gutterBottom>{data.name? data.name: "未命名活動"}</Typography>
              <Stack direction="row" spacing={1}>
                <Chip color="secondary" label={data.type || "未指定"}/>
                <Chip color="secondary" label={data.is_one_time? "一次性":"長期活動"}/>
                <Chip color="secondary" label={data.activity_id? data.activity_id:"ID"}/>
              </Stack >

              <Stack direction="column" spacing={2} sx={{ marginTop: '20px', marginBottom: '20px'}}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <ScheduleIcon color="icon" sx={{ paddingRight: '10px'}} />
                  {Array.isArray(data.date)?
                      <Typography variant="body1"> {data.date[0]? dayjs(data.date[0]).format('YYYY/MM/DD h:mm A'): "尚無活動時間資料"} </Typography>
                      :
                      <Typography variant="body1"> {data.date? dayjs(data.date).format('YYYY/MM/DD h:mm A'): "尚無活動時間資料"}  </Typography>
                  }
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <LocationOnIcon color="icon" sx={{ paddingRight: '10px'}}/>
                  <Typography variant="body1">{data.location? data.location: "未指定地點"}</Typography>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <PeopleIcon color="icon" sx={{ paddingRight: '10px'}}/>
                  {data.Participants.length > 0 ?
                    <AvatarGroup
                    renderSurplus={(surplus) => <span>+{surplus.toString()[0]}</span>}
                    total={data.Participants.length}
                    >
                      <div style={{alignSelf: 'center'}}>
                        <Chip avatar={<Avatar {...stringAvatar(data.Participants[0].name? data.Participants[0].name: "未知")}/>} label={data.Participants[0].name? data.Participants[0].name: "未知"} />
                      </div>
                    </AvatarGroup>
                    :
                    <div style={{alignSelf: 'center'}}>
                        尚無參加者
                    </div>
                  }
                </div>
              </Stack>
            </div>
          </Stack>
        </div>
        </Grid>
    );
}

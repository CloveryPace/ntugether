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
import { useTranslation } from 'react-i18next';

export default function ActivityComponent({data}) {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const style = { 
      border: '1.5px solid rgba(0, 0, 0, 0.1)',
      padding: '2rem'
    };

    return (
        <Grid item xs={12} md={4}>
        <div className="box" style={style}>
          <Stack direction="column">
            <div onClick={
              () => {
                navigate(`/activitypage`, { state: {id: data.activity_id } });
                window.location.reload(false);
              }
            } 
            style={{cursor: 'pointer'}}> 
            <Typography variant="h5" gutterBottom>{data.name? data.name: t("未命名活動")}</Typography>
              <Stack direction="row" spacing={1}>
                <Chip color="secondary" label={t(data.type) || t("未指定")}/>
                <Chip color="secondary" label={data.is_one_time? t("一次性"):t("長期活動")}/>
                <Chip color="secondary" label={data.activity_id? data.activity_id:"ID"}/>
              </Stack >

              <Stack direction="column" spacing={2} sx={{ marginTop: '20px', marginBottom: '20px'}}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <ScheduleIcon color="icon" sx={{ paddingRight: '10px'}} />
                  {Array.isArray(data.date)?
                      <Typography variant="body1"> {data.date[0]? dayjs(data.date[0]).format('YYYY/MM/DD h:mm A'): t("尚無活動時間資料")} </Typography>
                      :
                      <Typography variant="body1"> {data.date? dayjs(data.date).format('YYYY/MM/DD h:mm A'): t("尚無活動時間資料")}  </Typography>
                  }
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <LocationOnIcon color="icon" sx={{ paddingRight: '10px'}}/>
                  <Typography variant="body1">{data.location? data.location: t("未指定地點")}</Typography>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <PeopleIcon color="icon" sx={{ paddingRight: '10px'}}/>
                  {data.Participants.length > 0 ?
                    <AvatarGroup
                    renderSurplus={(surplus) => <span>+{surplus.toString()[0]}</span>}
                    total={data.Participants.length}
                    >
                      <div style={{alignSelf: 'center'}}>
                      <Chip avatar={<Avatar>{data.Participants[0].name? data.Participants[0].name[0]: "未知"}</Avatar>} label={data.Participants[0].name? data.Participants[0].name: "未知"} />
                      </div>
                    </AvatarGroup>
                    :
                    <div style={{alignSelf: 'center'}}>
                        {t("尚無參加者")}
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

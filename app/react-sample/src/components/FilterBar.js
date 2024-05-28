import * as React from 'react';
import { Typography, Stack, Divider, useTheme, Paper } from '@mui/material';
import { ToggleButtonGroup, ToggleButton } from '@mui/material';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';

export default function FilterBar({setFilterData, setFilterIsOpen, filterData}) {
  const theme = useTheme();
  const { t, i18n } = useTranslation();

  const [type, setType] = React.useState(filterData['type']);
  const [time, setTime] = React.useState(filterData['time']);
  const [category, setCategory] = React.useState(filterData['category']);
  const [location, setLocation] = React.useState(filterData['location']);

  const handleType = (event, newType) => {
    setType(newType);
  };
  const handleTime = (event, newTime) => {
    setTime(newTime);
  };
  const handleCategory = (event, category) => {
    setCategory(category);
  };
  const handleLocation = (event, newLocation) => {
    setLocation(newLocation);
  };

  const getFilterData = () => {
    // console.log(type, time, category, location);
    setFilterData({type: type, time: time, category: category, location: location});
    setFilterIsOpen(false);
  }

  return (
    <Paper elevation={3} sx={{ padding: '20px', width:'40%',minWidth: '320px', position: 'absolute',
    left: '50%', transform: 'translateX(-50%)', top: '51px', zIndex: 5}}>
      <Typography variant='h6'>{t('篩選')}</Typography>
      <Stack
        direction="column"
        divider={<Divider orientation="horizontal" flexItem />}
        spacing={2} sx={{ marginTop: '30px'}}
      >
        <Stack direction="column" spacing={2} sx={{ marginBottom: '15px' }} alignItems='left'>
          <Typography>{t('類型')}</Typography>
          <ToggleButtonGroup value={type} onChange={handleType} color="toggle">
            <ToggleButton value="活動">{t('活動')}</ToggleButton>
            <ToggleButton value="進度計畫">{t('進度計畫')}</ToggleButton>
          </ToggleButtonGroup>
        </Stack>
        <Stack direction="column" spacing={2} sx={{ marginBottom: '15px' }} alignItems='left'>
          <Typography>{t('時間')}</Typography>

          <ToggleButtonGroup value={time} onChange={handleTime} color="toggle">
            <ToggleButton size="small" value="今天">{t('今天')}</ToggleButton>
            <ToggleButton size="small"  value="明天">{t('明天')}</ToggleButton>
            <ToggleButton size="small"  value="本週">{t('本週')}</ToggleButton>
            <ToggleButton size="small"  value="本月">{t('本月')}</ToggleButton>
          </ToggleButtonGroup>
        </Stack>

        <Stack direction="column" spacing={2} sx={{ marginBottom: '15px' }} alignItems='left'>
          <Typography>{t('主題')}</Typography>
          <ToggleButtonGroup value={category} onChange={handleCategory} color="toggle">
            <ToggleButton value="運動">{t('運動')}</ToggleButton>
            <ToggleButton value="學習">{t('學習')}</ToggleButton>
            <ToggleButton value="其他">{t('其他')}</ToggleButton>
          </ToggleButtonGroup>
        </Stack>

        <Stack direction="column" spacing={2} sx={{ marginBottom: '15px' }} alignItems='left'>
          <Typography>{t('地點')}</Typography>
          <ToggleButtonGroup value={location} onChange={handleLocation} color="toggle">
            <ToggleButton value="北部">{t('北部')}</ToggleButton>
            <ToggleButton value="中部">{t('中部')}</ToggleButton>
            <ToggleButton value="南部">{t('南部')}</ToggleButton>
            <ToggleButton value="東部">{t('東部')}</ToggleButton>
          </ToggleButtonGroup>
        </Stack>
        <Button variant="contained" onClick={() => getFilterData()}>{t('套用')}</Button>

      </Stack>
    </Paper>
  );
}

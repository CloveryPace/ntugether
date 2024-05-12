import * as React from 'react';
import { Typography, Stack, Divider, useTheme, Paper } from '@mui/material';
import { ToggleButtonGroup, ToggleButton } from '@mui/material';
import Button from '@mui/material/Button';

export default function FilterBar({setFilterData, setFilterIsOpen, filterData}) {
  const theme = useTheme();

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
    <Paper elevation={3} sx={{ padding: '20px', width: '320px', position: 'absolute',
    left: '50%', transform: 'translateX(-50%)', top: '51px', zIndex: 5}}>
      <Typography variant='h6'>篩選</Typography>
      <Stack
        direction="column"
        divider={<Divider orientation="horizontal" flexItem />}
        spacing={2} sx={{ marginTop: '30px'}}
      >
        <Stack direction="row" spacing={2} sx={{ marginBottom: '15px' }} alignItems='center'>
          <Typography>類型</Typography>
          <ToggleButtonGroup value={type} onChange={handleType} color="toggle">
            <ToggleButton value="活動">活動</ToggleButton>
            <ToggleButton value="進度計畫">進度計畫</ToggleButton>
          </ToggleButtonGroup>
        </Stack>

        <Stack direction="row" spacing={2} sx={{ marginBottom: '15px' }} alignItems='center'>
          <Typography>時間</Typography>
          <ToggleButtonGroup value={time} onChange={handleTime} color="toggle">
            <ToggleButton value="今天">今天</ToggleButton>
            <ToggleButton value="明天">明天</ToggleButton>
            <ToggleButton value="本週">本週</ToggleButton>
            <ToggleButton value="本週末">本週末</ToggleButton>
          </ToggleButtonGroup>
        </Stack>

        <Stack direction="row" spacing={2} sx={{ marginBottom: '15px' }} alignItems='center'>
          <Typography>主題</Typography>
          <ToggleButtonGroup value={category} onChange={handleCategory} color="toggle">
            <ToggleButton value="運動">運動</ToggleButton>
            <ToggleButton value="讀書">讀書</ToggleButton>
            <ToggleButton value="其他">其他</ToggleButton>
          </ToggleButtonGroup>
        </Stack>

        <Stack direction="row" spacing={2} sx={{ marginBottom: '15px' }} alignItems='center'>
          <Typography>地點</Typography>
          <ToggleButtonGroup value={location} onChange={handleLocation} color="toggle">
            <ToggleButton value="北部">北部</ToggleButton>
            <ToggleButton value="中部">中部</ToggleButton>
            <ToggleButton value="南部">南部</ToggleButton>
            <ToggleButton value="東部">東部</ToggleButton>
          </ToggleButtonGroup>
        </Stack>
        <Button variant="contained" onClick={() => getFilterData()}>套用</Button>

      </Stack>
    </Paper>
  );
}

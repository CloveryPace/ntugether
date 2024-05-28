import * as React from 'react';
import dayjs from 'dayjs';
import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import axios from 'axios';
import { API_CREATE_ACTIVITY } from '../global/constants';
import { getAuthToken } from '../utils';

function ServerDay(props) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const isSelected = !props.outsideCurrentMonth && highlightedDays.includes(day.date());

  return (
    <Badge
      key={props.day.toString()}
      overlap="circular"
      badgeContent={isSelected ? '📌' : undefined}
    >
      <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
    </Badge>
  );
}

export default function BasicDateCalendar() {
  const requestAbortController = React.useRef(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [highlightedDays, setHighlightedDays] = React.useState([]);

  const fetchActivities = (date) => {
    const token = getAuthToken();
    const config = {
      headers: { 
        authorization: `Bearer ${token}`
      },
      params: { 
        mode: "joined"
      }
    };

    axios.get(API_CREATE_ACTIVITY, config)
      .then((res) => {
        console.log('取得使用者參與的活動成功');
        console.log(res.data);
        const allDates = res.data.flatMap(activity => activity.date);
        const daysToHighlight = allDates
          .map(date => dayjs(date))
          .filter(d => d.month() === date.month() && d.year() === date.year())
          .map(d => d.date());
        setHighlightedDays(daysToHighlight);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        console.log('取得使用者參與的活動失敗');
        setIsLoading(false);
      });
  };

  React.useEffect(() => {
    fetchActivities(dayjs());
  }, []);

  const handleMonthChange = (date) => {
    if (requestAbortController.current) {
      requestAbortController.current.abort();
    }

    setIsLoading(true);
    setHighlightedDays([]);
    fetchActivities(date); 
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        style={{ width: "100%"}}
        defaultValue={dayjs()}
        loading={isLoading}
        onMonthChange={handleMonthChange}
        renderLoading={() => <DayCalendarSkeleton />}
        slots={{
          day: ServerDay,
        }}
        slotProps={{
          day: {
            highlightedDays,
          },
        }}
      />
    </LocalizationProvider>
  );
}

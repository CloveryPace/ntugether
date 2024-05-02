//審核區

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

export default function PendingReview({data}) {
    const style = { 
      border: '1.5px solid rgba(0, 0, 0, 0.1)',
      padding: '1rem',
      spacing: "5rem"
    };
    const component = { 
        width: "40rem",
        border: '1.5px solid rgba(0, 0, 0, 0.1)',
        padding: '1rem'
      };

    return (
        <div className="box" style={style}>
            <Stack direction="column" spacing={1}>
            <div style = {component}>
                <Stack direction="row" spacing={45}>
                    <Stack direction="row" spacing={3}>
                        <Avatar alt="Remy Sharp"/>
                        <p> 他的回答... </p>
                    </Stack>
                    <Stack direction="row" spacing={1}>
                        <Button variant="contained" color="primary"> 加入 </Button> 
                        <Button variant="contained" color="primary"> 刪除 </Button> 
                    </Stack>
                </Stack >
            </div>
            <div style = {component}>
                <Stack direction="row" spacing={45}>
                    <Stack direction="row" spacing={3}>
                        <Avatar alt="Remy Sharp"/>
                        <p> 他的回答... </p>
                    </Stack>
                    <Stack direction="row" spacing={1}>
                        <Button variant="contained" color="primary"> 加入 </Button> 
                        <Button variant="contained" color="primary"> 刪除 </Button> 
                    </Stack>
                </Stack >
            </div>
            <div style = {component}>
                <Stack direction="row" spacing={45}>
                    <Stack direction="row" spacing={3}>
                        <Avatar alt="Remy Sharp"/>
                        <p> 他的回答... </p>
                    </Stack>
                    <Stack direction="row" spacing={1}>
                        <Button variant="contained" color="primary"> 加入 </Button> 
                        <Button variant="contained" color="primary"> 刪除 </Button> 
                    </Stack>
                </Stack >
            </div>
            </Stack>
        </div>
    );
}
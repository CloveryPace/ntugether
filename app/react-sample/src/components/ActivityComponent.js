// 活動資訊方塊

import { useState } from "react";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { pink } from '@mui/material/colors';

const outerTheme = createTheme({
  palette: {
    primary: {
      main: pink[100],
    },
  },
});

export default function ActivityComponent() {
    const [openContent, setOpenContent] = useState(false);

    const style = { 
      border: '1px solid rgba(0, 0, 0, 0.1)',
      width: '20rem',
      padding: '1rem'
    };

    //  打開 Activity 頁面
    const handleOpen = () => {
        if (openContent === false) {
          setOpenContent(true);
        }
        else {
          setOpenContent(false);
        }
      };

    return (
        <div className="box" style={style} onClick={handleOpen}>
          <Stack direction="column">
            <div> 
              <h3> Activity name </h3> 
              <Stack direction="row" spacing={1}>
                <Chip color="primary" label="type"/>
                <Chip color="primary" label="一次性"/>
              </Stack>
              <p> 🕰️ </p> 
              <p> 📍 </p>
              <p> 參加者 </p>
            </div>
            <ThemeProvider theme={outerTheme}>
              <Button variant="contained" color="primary"> 參加 </Button> 
            </ThemeProvider>
          </Stack>
        </div>
    );
}

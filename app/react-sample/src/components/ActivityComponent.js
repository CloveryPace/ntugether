// 活動資訊方塊

import { useState } from "react";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
 
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
              <Chip color="primary" label="type"/>
              <Chip color="primary" label="一次性"/>
              <p> 🕰️ </p> 
              <p> 📍 </p>
              <p> 參加者 </p>
            </div>
            <Button variant="contained" color="warning"> 參加 </Button>
          </Stack>
        </div>
    );
}

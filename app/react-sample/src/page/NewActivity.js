// 活動完整資訊

import { useRef } from "react";
import Stack from '@mui/material/Stack';
import TextField from "@mui/material/TextField";

function NewActivity() {
    const textfieldRef = useRef<HTMLInputElement>(null);

    const style = { 
        padding: "5rem 0 10rem 10rem",
    };
    const style2 = { 
        padding: "1rem 0 0 0" 
    };
    const instyle = { 
        padding: "3rem 0 0 0" 
    };

  return (
    <div style={style}>

        <Stack direction="row" spacing={2}>
            <h2> 新增活動 </h2> 
        </Stack>

        <Stack direction="column" spacing={2} style={instyle}>
            <h4> 活動名稱 </h4>
            <TextField
            inputRef={textfieldRef}
            variant="outlined"
            sx={{ mt: 1, width: '30ch'}}
            autoFocus
            />
            <h4> 活動簡介 </h4>
            <TextField
            inputRef={textfieldRef}
            variant="outlined"
            sx={{ mt: 1, width: '30ch'}}
            autoFocus
            />
            <h4> 人數上限 </h4>
            <TextField
            inputRef={textfieldRef}
            variant="outlined"
            sx={{ mt: 1, width: '20ch'}}
            autoFocus
            />
        </Stack>

        <div style={instyle}>
        </div>

    </div>
  );
}

export default NewActivity;
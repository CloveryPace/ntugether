import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from "@mui/material/TextField";
import { useRef } from "react";

export default function ReviewBox({id, question, need_review}) {
    const Answer = useRef();
    const handleSubmit = e => {
        console.log(Answer.current?.value);
    };  

    const style = { 
      border: '1.5px solid rgba(0, 0, 0, 0.1)',
      padding: '2rem'
    };

    return (
      <>
      {need_review?
        <div className="box" style={style}>
          <Stack direction="column" spacing={2}>
            <Typography variant="h5" gutterBottom>立即加入</Typography>
            <p> 審核題目：XXX</p>
              <TextField
                variant="outlined"
                name="reviewreply"
                label="輸入回答"
                inputRef={Answer}
                />
              <Button variant="contained" color="primary" onClick={handleSubmit}> 送出加入請求 </Button> 
          </Stack>
        </div>
      :
        <Button variant="contained" color="primary"> 參加活動 </Button>
      }
      </>
    );
}
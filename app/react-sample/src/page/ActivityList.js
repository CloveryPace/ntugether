// 顯示多活動資訊方塊（ActivityComponent）

import Stack from '@mui/material/Stack';
import ActivityComponent from "../components/ActivityComponent";

function ActivityList() {

  const style = { 
    padding: "3rem"
  };
  const instyle = { 
    padding: "1.5rem 0 0 0" 
  };

  return (
    <div style={style}>

      <Stack direction="row" spacing={1.5} className='m-16'>
        <h3> 活動列表 </h3> 
      </Stack>

      <div style={instyle}>
        <ActivityComponent></ActivityComponent>
      </div>

    </div>
  );
}

export default ActivityList;
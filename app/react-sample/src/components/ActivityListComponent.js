import * as React from 'react'; 

import ActivityComponent from './ActivityComponent';
import Button from '@mui/material/Button';

import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import { API_CREATE_ACTIVITY } from '../global/constants';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { getAuthToken } from '../utils';
import { useTranslation } from 'react-i18next';

export default function ActivityList() {
  const [data, setData] = useState([]);
  const [userToken, setUserToken] = useState(getAuthToken());
  const { t, i18n } = useTranslation();


  useEffect(() => {
    console.log('execute function in useEffect');
        //設定authorization
        const config = {
            headers: { 
              authorization: `Bearer ${userToken}`
            }
        };
        console.log(userToken);
        //取得活動list
        axios.get(API_CREATE_ACTIVITY, config)
          .then(function (res) {
            console.log(res.data);
            setData(res.data);
          })
          .catch(function (err) {
            console.log(err);
            alert("error");
          });
    }, []);
  

    return (

    <div>
      <Grid container spacing={2}>
                    
           { (data.map((activity) => {
              return (
                <ActivityComponent data={activity} key={activity.id} />
              );
            }))
          }

      </Grid>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', marginBottom: '20px' }}>
      <Button sx={{ my: 2 }}><Typography>{t('查看更多')}</Typography></Button> 
    </div>
    </div>
    );
  }
  


  // const chemists = people.filter(person =>
  //   person.profession === 'chemist'
  // );
  // const listItems = chemists.map(person =>
  //   <li>
  //     <img
  //       src={getImageUrl(person)}
  //       alt={person.name}
  //     />
  //     <p>
  //       <b>{person.name}:</b>
  //       {' ' + person.profession + ' '}
  //       known for {person.accomplishment}
  //     </p>
  //   </li>
  // );
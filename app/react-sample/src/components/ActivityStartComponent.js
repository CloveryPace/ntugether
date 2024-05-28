import * as React from 'react'; 
import ActivityComponent from './ActivityComponent';
import { Grid } from '@mui/material';
import { API_CREATE_ACTIVITY } from '../global/constants';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { getAuthToken } from '../utils';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';

export default function ActivityStartComponent({mode_param}) {
  const [data, setData] = useState([]);
  const [userToken, setUserToken] = useState(getAuthToken());
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const config = {
        headers: { 
          authorization: `Bearer ${userToken}`,
        },
        params: { 
          mode: mode_param,
          start_date: dayjs().toJSON()
        } 
    };
    //取得活動
    axios.get(API_CREATE_ACTIVITY, config)
      .then(function (res) {
        console.log(mode_param);
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
                <>
                <ActivityComponent data={activity} key={activity.id} />
                </>
              );
            }))
          }

      </Grid>
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
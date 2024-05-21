import * as React from 'react'; 

import PlanComponent from './PlanComponent';
import Button from '@mui/material/Button';

import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import { API_CREATE_PLAN } from '../global/constants';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

import { getAuthToken } from '../utils';



export default function PlanListComponent() {
  const [data, setData] = useState([]);
  const [userToken, setUserToken] = useState(getAuthToken());
  const { t, i18n } = useTranslation();



  useEffect(() => {
    console.log('execute function in useEffect');
    //登入
    // axios.post(API_LOGIN, {
    //   "email": "r12725066@ntu.edu.tw",
    //   "password": "a"
    // })
    // .then(function (response) {
    //     console.log(response.status, response.data);
    //     //儲存token
    //     const token = response.data.jwtToken;
        //設定authorization
        const config = {
            headers: { 
              authorization: `Bearer ${userToken}`
            }
        };
        //取得活動list
        axios.get(API_CREATE_PLAN, config)
          .then(function (res) {
            console.log(res.data);
            setData(res.data);
          })
          .catch(function (err) {
            console.log(err);
            alert("error");
          });

      // })
      // .catch(function (error) {
      //     console.log(error);
      // });
    }, []);

    return (

    <div>
      <Grid container spacing={2}>
        
           {(data.map((plan) => {
              return (
                <PlanComponent data={plan} key={plan.id} />
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
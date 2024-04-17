import * as React from 'react'; 

import ActivityComponent from './ActivityComponent';
import Button from '@mui/material/Button';

import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import { API_CREATE_ACTIVITY } from '../global/constants';
import { useState, useEffect } from 'react';
import axios from 'axios';


export default function ActivityList() {
  const [data, setData] = useState([]);


  useEffect(() => {
    console.log('execute function in useEffect');
    axios.get(API_CREATE_ACTIVITY)
          .then(function (response) {
            console.log(response);
            setData(response.data.reverse())
          })
          .catch(function (error) {
            console.log(error);
          });
    }
  ,[]);
  

    return (

    <div>
      <Grid container spacing={2}>
        {/* <ActivityComponent />
        <ActivityComponent />
        <ActivityComponent />
        <ActivityComponent />
        <ActivityComponent />
        <ActivityComponent /> */}
        
            
           { (data.map((activity) => {
              return (
                <ActivityComponent data={activity} key={activity.id} />
              );
            }))
          }

      </Grid>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', marginBottom: '20px' }}>
      <Button sx={{ my: 2 }}><Typography>查看更多</Typography></Button> 
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
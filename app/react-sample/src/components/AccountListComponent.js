import * as React from 'react'; 

import AccountComponent from './AccountComponent';
import ActivityComponent from './ActivityComponent';
import { Grid } from '@mui/material';
import { API_CREATE_ACTIVITY } from '../global/constants';
import { useState, useEffect } from 'react';
import axios from 'axios';


export default function AccountListComponent() {
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

    
      <Grid item container spacing={2} xs={12} md={12} justifyContent="center">
        <AccountComponent />
        <AccountComponent />
        
           { (data.map((activity) => {
              return (
                <ActivityComponent data={activity} key={activity.id} />
              );
            }))
          }

      </Grid>
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
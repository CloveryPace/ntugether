import * as React from 'react'; 

import AccountComponent from './AccountComponent';
import ActivityComponent from './ActivityComponent';
import { Grid } from '@mui/material';
import { API_GET_USER } from '../global/constants';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { getAuthToken, getUserId } from '../utils';


export default function AccountListComponent() {
  const [data, setData] = useState([]);


  useEffect(() => {
    const userId = getUserId();
    const token = getAuthToken();
    const config = {
      headers: { 
        authorization: `Bearer ${token}`
      }
  };
    axios.get(API_GET_USER + '/' + userId +'/following',config)
      .then(function (response) {
        console.log(response);
        setData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  ,[ ]);
  

    return (

    
      <Grid item container spacing={2} xs={12} md={12} justifyContent="center">
        
           { (data.map((user) => {
              return (
                <AccountComponent data={user}  />
              );
            }))
          }

      </Grid>
    );
  }
  

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { ThemeProvider } from '@mui/material/styles';
import theme from './components/Theme'; 
import HomePage from './page/HomePage';
import Signup from './page/Signup';
import ActivityPage from './page/ActivityPage';
import ActivityList from './page/ActivityList';
import NewActivity from './page/NewActivity';
import Login from './page/Login';
import UserProfile from './page/UserProfile';
import ForgetPassword from './page/ForgetPassword';
import AccountSetting from './page/AccountSetting';
import ActivityAttendPage from './page/ActivityAttendPage';
import FollowActivity from './page/FollowActivity';
import FollowAccount from './page/FollowAccount';
import User from './page/User';

import PlanNew from './page/PlanNew';
import PlanPage from './page/PlanPage';
import FilterBar from './components/FilterBar';
import ProgressEdit from './page/ProgressEdit';
import PlanList from './page/PlanList';
import PlanManage from './page/PlanManage';
import Search from './page/Search';

import React, { Component } from 'react';
import PrivateRoute from './components/PrivateRoute';
import ActivityListType from './page/ActivityListType';


// TODO: user沒有jwt時，redirect到login頁面
function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<PrivateRoute/>}>
            <Route exact path='/' element={<HomePage/>}/>
          </Route>
          {/* <PrivateRoute index element={<HomePage />} /> */}

          {/* Access without signin */}
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/forgetPassword' element={<ForgetPassword />} />

          <Route exact path='/activitylist' element={<PrivateRoute/>}>
            <Route exact path='/activitylist' element={<ActivityList/>}/>
          </Route>
          <Route exact path='/activitylisttype' element={<PrivateRoute/>}>
            <Route exact path='/activitylisttype' element={<ActivityListType/>}/>
          </Route>
          {/* <Route path='/activitylist' element={<ActivityList />} /> */}
          <Route exact path='/activitypage' element={<PrivateRoute/>}>
            <Route exact path='/activitypage' element={<ActivityPage/>}/>
          </Route>
          {/* <Route path='/activitypage' element={<ActivityPage />} /> */}
          <Route exact path='/newactivity' element={<PrivateRoute/>}>
            <Route exact path='/newactivity' element={<NewActivity/>}/>
          </Route>
          {/* <Route path='/newactivity' element={<NewActivity />} /> */}
          <Route exact path='/userprofile' element={<PrivateRoute/>}>
            <Route exact path='/userprofile' element={<UserProfile/>}/>
          </Route>
          {/* <Route path='/userprofile' element={<UserProfile />} /> */}
          <Route exact path='/user' element={<PrivateRoute/>}>
            <Route exact path='/user' element={<User/>}/>
          </Route>
          {/* <Route path='/user' element={<User />} /> */}
          <Route exact path='/setting' element={<PrivateRoute/>}>
            <Route exact path='/setting' element={<AccountSetting/>}/>
          </Route>
          {/* <Route path='/setting' element={<AccountSetting />} /> */}
          <Route exact path='/activityattendpage' element={<PrivateRoute/>}>
            <Route exact path='/activityattendpage' element={<ActivityAttendPage/>}/>
          </Route>
          {/* <Route path='/activityattendpage' element={<ActivityAttendPage />} /> */}
          <Route exact path='/favorite-activity' element={<PrivateRoute/>}>
            <Route exact path='/favorite-activity' element={<FollowActivity/>}/>
          </Route>
          {/* <Route path='/favorite-activity' element={<FollowActivity />} /> */}
          <Route exact path='/follow-members' element={<PrivateRoute/>}>
            <Route exact path='/follow-members' element={<FollowAccount/>}/>
          </Route>
          {/* <Route path='/follow-members' element={<FollowAccount />} /> */}
          <Route exact path='/planManage' element={<PlanManage/>}>
            <Route exact path='/planManage' element={<PlanManage/>}/>
          </Route>
          {/* <Route path='/planManage' element={<PlanManage />} /> */}


          <Route exact path='/planPage' element={<PrivateRoute/>}>
            <Route exact path='/planPage' element={<PlanPage/>}/>
          </Route>

          <Route exact path='/planNew' element={<PrivateRoute/>}>
            <Route exact path='/planNew' element={<PlanNew/>}/>
          </Route>

          <Route exact path='/planList' element={<PrivateRoute/>}>
            <Route exact path='/planList' element={<PlanList/>}/>
          </Route>

          <Route exact path='/search' element={<PrivateRoute/>}>
            <Route exact path='/search' element={<Search/>}/>
          </Route>


        </Routes>
        </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
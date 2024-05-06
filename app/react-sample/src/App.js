
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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


// TODO: user沒有jwt時，redirect到login頁面
function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/forgetPassword' element={<ForgetPassword />} />
          <Route path='/activitylist' element={<ActivityList />} />
          <Route path='/activitypage' element={<ActivityPage />} />
          <Route path='/newactivity' element={<NewActivity />} />
          <Route path='/userprofile' element={<UserProfile />} />
          <Route path='/user' element={<User />} />
          <Route path='/setting' element={<AccountSetting />} />
          <Route path='/activityattendpage' element={<ActivityAttendPage />} />
          <Route path='/favorite-activity' element={<FollowActivity />} />
          <Route path='/follow-members' element={<FollowAccount />} />
          <Route path='/planManage' element={<PlanManage />} />

        </Routes>
        </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

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
          <Route path='/setting' element={<AccountSetting />} />


        </Routes>
        </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;



/*
import './App.css';
import HeaderBar from "./components/HeaderBar";

import HomePage from './page/HomePage.js';
import NewActivity from './page/NewActivity';
import ActivityList from './page/ActivityList.js';
import ActivityPage from './page/ActivityPage.js';
import Login from './page/Login.js';
import Signup from './page/Signup.js';

function App() {
  return (
    <ActivityList />
  );
}

export default App;
*/
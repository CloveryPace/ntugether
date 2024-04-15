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

// TODO: user沒有jwt時，redirect到login頁面
function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/activitylist' element={<ActivityList />} />
          <Route path='/activitypage' element={<ActivityPage />} />
          <Route path='/newactivity' element={<NewActivity />} />
        </Routes>
        </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

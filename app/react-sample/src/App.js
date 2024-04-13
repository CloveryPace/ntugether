import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { ThemeProvider } from '@mui/material/styles';
import theme from './components/Theme'; 
import HomePage from './page/HomePage';
import Signup from './page/Signup';
import ActivityPage from './page/ActivityPage';
import ActivityList from './page/ActivityList';
import Login from './page/Login';

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
        </Routes>
        </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

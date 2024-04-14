import './App.css';
import HeaderBar from "./components/HeaderBar";
import { ThemeProvider } from '@mui/material/styles';
import theme from './components/Theme'; 

function App() {
  return (
    <ThemeProvider theme={theme}>
    <div>
      <HeaderBar />
      <main>
      </main>
    </div>
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
    <HomePage />
  );
}

export default App;
*/
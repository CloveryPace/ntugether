import './Homepage.css';
import HeaderBar from './components/HeaderBar';
import MainInform from './components/MainInform';
import TextButtons from './components/TextButtons';
import ActivityList from './components/ActivityList';
import Footer from './components/Footer';

import { ThemeProvider } from '@mui/material/styles';
import { Typography} from '@mui/material';

import theme from './components/Theme'; 

function App() {
  return (
    <ThemeProvider theme={theme}>
        
        <div className='MainBackground'>
        <HeaderBar />
        <div className='Main'>
          <Typography variant="h5">我的活動</Typography>
          <MainInform />
          <Typography variant="h5">活動類別</Typography>
          <TextButtons />
          <Typography variant="h5">熱門活動</Typography>
          <ActivityList />
        </div>
        <Footer />
        </div>
      

      </ThemeProvider>
  );
}

export default App;
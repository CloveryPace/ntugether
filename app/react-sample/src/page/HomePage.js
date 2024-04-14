import './Common.css';
import HeaderBar from '../components/HeaderBar';
import MainInform from '../components/MainInform';
import TextButtons from '../components/TextButtons';
import ActivityListComponent from '../components/ActivityListComponent';
import Footer from '../components/Footer';

import { ThemeProvider } from '@mui/material/styles';
import { Typography} from '@mui/material';

import theme from '../components/Theme'; 

function App() {
  return (
    <ThemeProvider theme={theme}>
        
        <HeaderBar />
        <div className='Main'>
          <Typography variant="h4">我的活動</Typography>
          <MainInform />
          <Typography variant="h4">活動類別</Typography>
          <TextButtons />
          <Typography variant="h4">熱門活動</Typography>
          <ActivityListComponent />
        </div>
        <Footer />
      

      </ThemeProvider>
  );
}

export default App;
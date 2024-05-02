import './Common.css';
import HeaderBar from '../components/HeaderBar';
import MainInform from '../components/MainInform';
import TextButtons from '../components/TextButtons';
import ActivityListComponent from '../components/ActivityListComponent';
import Footer from '../components/Footer';
import FollowPageNav from '../components/FollowPageNav';

import { ThemeProvider } from '@mui/material/styles';
import { Typography} from '@mui/material';

import theme from '../components/Theme'; 

function FollowActivity() {
  return (
    <ThemeProvider theme={theme}>
        
        <HeaderBar />
        <div className='Main'>
        <Typography variant="h4" component="h1">追蹤清單</Typography>
        <FollowPageNav selectedTab={0}/>
        <ActivityListComponent />
        </div>
        <Footer />
      

      </ThemeProvider>
  );
}

export default FollowActivity;
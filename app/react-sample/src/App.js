
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

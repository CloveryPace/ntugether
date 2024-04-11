import './App.css';
import HeaderBar from "./components/HeaderBar";
import NewActivity from './page/NewActivity';

function App() {
  return (
    <div>
      <HeaderBar />
      <main>
        <NewActivity/>
      </main>
    </div>
  );
}

export default App;

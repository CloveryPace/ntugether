import './App.css';
import HeaderBar from "./components/HeaderBar";
import ActivityList from "./page/ActivityList";

function App() {
  return (
    <div>
      <HeaderBar />
      <main>
        <ActivityList/>
      </main>
    </div>
  );
}

export default App;

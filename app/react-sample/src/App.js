import './App.css';
import HeaderBar from "./components/HeaderBar";
import ActivityPage from "./page/ActivityPage";

function App() {
  return (
    <div>
      <HeaderBar />
      <main>
        <ActivityPage/>
      </main>
    </div>
  );
}

export default App;

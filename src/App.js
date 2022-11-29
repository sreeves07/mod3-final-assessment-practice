import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Nav from "./Nav";
import Home from "./Home";
import Main from "./Main";

// import './App.css';

function App() {

  return (
    <Router>
      <div className="App">
        <Nav />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/main" element={<Main />} />
      </Routes>
    </Router>
  );
}

export default App;

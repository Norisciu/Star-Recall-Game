import './App.css';
import React  from "react";
import { PlayScreen } from './Screens/PlayScreen/PlayScreen.jsx';
import { StartScreen } from './Screens/StartScreen/StartScreen.jsx';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { EndGameScreen } from './Screens/EndGameScreen/EndGameScreen.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartScreen />} /> 
        <Route path="playScreen/:playMode" element={<PlayScreen />} />  
        <Route path="/EndGame/:points" element={<EndGameScreen />} /> 

      </Routes>
    </Router>
  )
}

export default App;

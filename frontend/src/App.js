
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import ChatPage from './Pages/ChatPage';
import Signup from './components/Authentication/Signup';

function App() {
  return (
    <div className="App">
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/chats" element={<ChatPage/>}/>
        <Route path="/signup" element={<Signup/>}/>
      </Routes>
    </Router>
    </div>
  );
}

export default App;


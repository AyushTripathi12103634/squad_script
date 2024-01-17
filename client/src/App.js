import './App.css';
import Login from './Pages/Login';
import Home from './Pages/Home';
import About from './Pages/About';
import Join from './Pages/Join';
import Profile from './Pages/Profile';
import Signup from './Pages/Signup';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/join" element={<Join />} />
      <Route path="/about" element={<About />} />
    </Routes>
    </BrowserRouter>
    );
}

export default App;

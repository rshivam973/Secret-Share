import './App.css';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Register from './components/Register/Register';
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom';
import Contact from './components/Contact/Contact';
import About from './components/About/About';
import Dashboard from './components/Dashboard/Dashboard';
import SayoutPage from './components/Sayout Page/SayoutPage';
import Deployed from './components/Deployed/Deployed';
import { usernameExists } from './components/Context/AuthContext';
import ErrorPage from './components/404 Page/ErrorPage';
import Settings from './components/User/Settings/Settings';

function App() {

  return (
    
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path="/:username" element={<DeployedWrapper />} />
        <Route path='/error-404' element={<ErrorPage />} />
        <Route path='/settings' element={<Settings/>} />
      </Routes>
    </BrowserRouter>
  );
}

function DeployedWrapper() {
  // Use the useParams hook to get the 'username' from the route
  const { username } = useParams();

  // Pass the 'username' as a prop to the Deployed component
  return <Deployed username={username} />;
}

export default App;

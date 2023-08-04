import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import Dashboard from './pages/Dashboard'
import Navbar from './components/Navbar'

function App() {
  return (
    <>
    <Navbar />
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={ <LoginPage /> } />
        <Route path='/dashboard' element={ <Dashboard /> } />
        <Route path='/signup' element={ <SignupPage /> } />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;

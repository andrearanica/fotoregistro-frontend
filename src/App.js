import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import Dashboard from './pages/Dashboard'
import Navbar from './components/Navbar'
import ClassroomPage from './pages/ClassroomPage'

function App() {
  return (
    <>
    <Navbar />
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/login' element={ <LoginPage /> } />
        <Route path='/dashboard' element={ <Dashboard /> } />
        <Route path='/signup' element={ <SignupPage /> } />
        <Route path='/classroom/:id' element={ <ClassroomPage /> } />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;

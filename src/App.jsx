
import './App.css'
import {TrackerDashboard }from './components/TrackerForm'
// import Login from './components/Login'
// import Signup from './components/Register'
// import Dashboard from './pages/Dashboard'
// import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <>
    {/* <Router>
      <Routes>
        <Route path='/' element={<Dashboard/>}/>
        <Route path='/Register' element={<Signup/>}/>
        <Route path='login' element={<Login/>}/>
      </Routes>
      
  
    </Router> */}
    <TrackerDashboard/>
    
    </>
  )
}

export default App

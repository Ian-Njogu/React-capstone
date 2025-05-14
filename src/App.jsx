
import './App.css'
import ChartDisplay from './components/ChartDisplay'
import {TrackerDashboard }from './components/TrackerForm'
import Login from './components/Login'
import Signup from './components/Register'
// import Dashboard from './pages/Dashboard'
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<TrackerDashboard/>}/>
        <Route path='/Register' element={<Signup/>}/>
        <Route path='login' element={<Login/>}/>
        <Route path='ChartDisplay' element={<ChartDisplay/>}/>

      </Routes>
      
  
    </Router>
    </>
  )
}

export default App

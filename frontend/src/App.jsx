import { useState } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='bg-gradient-to-br from-gray-50 to-gray-100'>
      <Navbar />
      <Outlet />
      
    </ div>
  )
}

export default App

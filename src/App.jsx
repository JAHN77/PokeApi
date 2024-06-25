import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Api from './components/Api'
import NavBar from './components/NavBar'
function App() {
  

  return (
    <>
      <NavBar/>
      <Api/>
    </>
  )
}

export default App

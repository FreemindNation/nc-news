import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Login from './Login'



const App = () => {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element= {<Login />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;

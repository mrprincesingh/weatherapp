import React from 'react'
import {  Route, Routes } from 'react-router-dom'
import Login from './Login/Login'
import SignUp from './signUp/SignUp'
import Home from './Home/Home'


import { ProtectedRoute } from 'protected-route-react';
import { useSelector } from 'react-redux'
import ReqAuth from './ReqAuth'



const MainRoute = () => {
  return (
  <Routes>
          <Route path="/" element={ <Home />} /> 
 <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
  </Routes>
  )
}

export default MainRoute
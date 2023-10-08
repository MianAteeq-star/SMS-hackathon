import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Login'
import Register from './Register'

export default function index() {
  return (
    <div>
        <Routes>
<Route path='/login' element={<Login/>}/>
<Route path='/register' element={<Register/>}/>
<Route path='*' element={<h1>404 &ensp; Page Not Found</h1>}/>


        </Routes>
    </div>
  )
}

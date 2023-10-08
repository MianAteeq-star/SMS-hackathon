import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Attendence from './Attendence/index';
import Course from './Course/index';
import Student from './Student/index';
// import Home from '../FrontEnd/Pages/Home/index'
export default function Index() {
  return (
    <Routes>
        {/* <Route path='/' element={<Home/>} /> */}
        <Route path='/attendence' element={<Attendence/>} />
        <Route path='/course' element={<Course/>} />
        <Route path='/student' element={<Student/>} />
        {/* <Route path='*' element={<h1>404</h1>}/> */}
    </Routes>
  )
}

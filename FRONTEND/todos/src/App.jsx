import React from 'react'
import { Route, RouterProvider, Routes, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'


function App() {

  const routes = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
      </Route>
    )
  )


  return (
    <>
      <RouterProvider router={routes}/>
    </>
  )
}

export default App

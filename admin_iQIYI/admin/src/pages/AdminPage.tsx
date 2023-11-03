import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

const AdminPage = () => {
  return (
    <div className='d-flex'>
        <Sidebar/>
        <Outlet/>
    </div>
  )
}

export default AdminPage
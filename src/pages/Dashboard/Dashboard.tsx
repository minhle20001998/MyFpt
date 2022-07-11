import React from 'react'
import { Outlet } from 'react-router';
import MyNavbar from '../../components/Navbar/Navbar';
import SideMenu from '../../components/SideMenu/SideMenu';
import './Dashboard.css'
export default function Dashboard() {

  return (
    <div className='h-100'>
      <MyNavbar />
      <main className="main-area">
        <SideMenu />
        <div className='main-content'><Outlet /></div>
      </main>
    </div>
  )
}

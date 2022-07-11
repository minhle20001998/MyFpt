import React from 'react'
import './SideMenu.css'
import { MenuType } from './SideMenu.type'


export default function SideMenu() {

  const menus: MenuType[] = [
    { title: 'Dashboard', active: 'active' },
    { title: 'Notes', active: '' }
  ]

  return (
    <div className='side-menu'>
      {menus.map((item: MenuType) => {
        return <div className={`side-menu-item ${item.active}`} key={item.title}>{item.title}</div>
      })}
    </div>
  )
}

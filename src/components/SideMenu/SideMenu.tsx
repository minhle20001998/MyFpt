import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import './SideMenu.css'
import { MenuType } from './SideMenu.type'

const defaultMenus: MenuType[] = [
  { title: 'Dashboard', active: 'active', link: '/' },
  { title: 'Notes', active: '', link: '/notes' }
]

export default function SideMenu() {

  const [menus, setMenus] = useState(defaultMenus);
  const navigate = useNavigate();

  const handleOnclick = (title: string) => {
    return () => {
      let link = "";
      const updateMenu = menus.map((m: MenuType) => {
        if (m.title === title) {
          link = m.link;
          return { ...m, active: 'active' }
        }
        return { ...m, active: '' }
      })
      setMenus(updateMenu);
      navigate(link);
    }
  }

  return (
    <div className='side-menu'>
      {menus.map((item: MenuType) => {
        return <div
          className={`side-menu-item ${item.active}`}
          key={item.title}
          onClick={handleOnclick(item.title)}
        >
          {item.title}
        </div>
      })}
    </div>
  )
}

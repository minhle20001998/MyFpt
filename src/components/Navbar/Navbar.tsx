import React from 'react'
import './Navbar.css'
import { NavDropdown } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useUser } from '../../context/AuthContext';

export default function MyNavbar() {

  const { user, firebaseLogout } = useUser();

  const getUsernameFromEmail = () => {
    if (user) {
      return user?.email?.split('@')[0];
    }
    return 'Unknown'
  }

  return (
    <>
      <Navbar className='main-navbar px-5'>
        <Navbar.Brand href="/">
          <div id="title" className='d-flex justify-content-center align-items-baseline'>
            <span>My</span>
            <span>F</span>
            <span>P</span>
            <span>T</span>
          </div>
        </Navbar.Brand>
        <Nav className='ms-auto '>
          <NavDropdown title={getUsernameFromEmail()} id="collasible-nav-dropdown">
            <NavDropdown.Item>Action</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={firebaseLogout}>
              Logout
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar>
      <div className='navbar-placeholder'></div>
    </>
  )
}

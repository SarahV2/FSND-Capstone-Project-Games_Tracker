import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Redirect, Link } from 'react-router-dom';
import '../../App.css';
import { useAuth0 } from '@auth0/auth0-react';

const NavBar = () => {
  const { user, isAuthenticated } = useAuth0();
  const { loginWithRedirect, logout } = useAuth0();
  const userRole = user && user['http://demozero.net/roles'][0];
  console.log(userRole);


  return (
    <Navbar fixed='top' collapseOnSelect expand='lg' bg='dark' variant='dark'>
      {/* <Navbar.Brand> */}

      {/* </Navbar.Brand> */}
      <Navbar.Toggle aria-controls='responsive-navbar-nav' />
      <Navbar.Collapse id='responsive-navbar-nav'>
        <Nav className='mr-auto'>
        <Link to='/games' className='nav-link'>
          <h5 id='logo'>Video Games Tracker</h5>
          {/* {' '} */}
        </Link>
          <Link to='/games' className='nav-link'>
            Home
          </Link>

          {isAuthenticated&&userRole!=='admin' ? (
            <Link to='/games/mygames' className='nav-link'>My List</Link>
          ) : (
            ''
          )}
          <Nav.Link href='/explore/blogs'>Explore</Nav.Link>
        </Nav>
        <Nav>
          {!isAuthenticated ? (
            <Nav.Link onClick={() => loginWithRedirect()}>Login</Nav.Link>
          ) : (
            <Nav>
              <Nav.Link id='userName' disabled>
                {user.email}
              </Nav.Link>
              {/* <Nav.Link href='#' onClick={() => this.handleLogout()}> */}

              <Nav.Link
                onClick={() => logout({ returnTo: window.location.origin })}
              >
                Logout
              </Nav.Link>
            </Nav>
          )}

          {!isAuthenticated ? (
            <Nav.Link href='/register'>Register</Nav.Link>
          ) : (
            ''
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
  // }
};

export default NavBar;

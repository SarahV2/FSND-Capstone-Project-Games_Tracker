import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../App.css';
import { useAuth0 } from '@auth0/auth0-react';

const NavBar = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { loginWithRedirect, logout } = useAuth0();
  const userRole = user && user['http://demozero.net/roles'][0];
  const isAdmin = (userRole === 'admin');

  if(!isLoading&&!isAuthenticated){
    localStorage.removeItem('userRecords')
  }
  return (
    <Navbar fixed='top' collapseOnSelect expand='lg' bg='dark' variant='dark'>
      <Navbar.Toggle aria-controls='responsive-navbar-nav' />
      <Navbar.Collapse  id='responsive-navbar-nav'>
        <Nav className='mr-auto'>
          <Link to='/' className='nav-link'>
            <h5 id='logo'>Video Games Tracker</h5>
          </Link>

          {!isAuthenticated ? (
            ''
          ) : !isAdmin ? (
            <Nav>
              {' '}
              <Link to='/' className='nav-link'>
                Home
              </Link>
              <a href='/games/mygames' className='nav-link'>
                My List
              </a>
            </Nav>
          ) : (
            <Link to='/games/new' className='nav-link'>
              Add Game
            </Link>
          )}

          {isAuthenticated && isAdmin ? (
            <Link className='nav-link' to='/admin/games'>
              Manage Games
            </Link>
          ) : (
            ''
          )}
        </Nav>
        <Nav>
          {!isAuthenticated ? (
            <Nav.Link onClick={() => loginWithRedirect()}>
              Login / Register
            </Nav.Link>
          ) : (
            <Nav>
              <Nav.Link id='userName' disabled>
                {user.email}
              </Nav.Link>
              <Nav.Link
                onClick={() => {;
                logout({ returnTo: window.location.origin })
                }}
              >
                Logout
              </Nav.Link>
            </Nav>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;

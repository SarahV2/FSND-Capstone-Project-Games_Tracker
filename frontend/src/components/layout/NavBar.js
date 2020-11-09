import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import '../../App.css'
import { useAuth0 } from "@auth0/auth0-react";

 const NavBar=()=> {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const { loginWithRedirect, logout } = useAuth0();
//   state = {
//     redirect: false,
//     loggedIn: false,
//   };
//   componentDidMount() {
  
//     let currentUser = localStorage.getItem('currentUserID');
//     if (currentUser) {
//       this.setState({
//         loggedIn: true,
//       });
//     }
//   }

//   handleLogout = () => {
//     localStorage.removeItem('currentUserID');
//     localStorage.removeItem('currentName');
//     localStorage.removeItem('hasProfile');

//     this.setState({
//       loggedIn: false,
//     });
//     window.location.href = '/';
//   };
//   render() {
//     if (this.state.redirect) {
//       return <Redirect to='/' />;
//     }

//     const { loggedIn } = this.state;
//     const name = JSON.parse(localStorage.getItem('currentName'));

    return (
      <Navbar fixed='top' collapseOnSelect expand='lg' bg='dark' variant='dark'>
        <Navbar.Brand href='/home'>
          {/* <img
            style={{ width: '150px' }}
            src={require('./../../images/logo.png')}
            alt='logo'
          /> */}
          <h6>VGT</h6>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='mr-auto'>
            <Nav.Link href='/home'>Home</Nav.Link> 

           {isAuthenticated? <Nav.Link href='/posts/new'>New Entry</Nav.Link>:''}
            <Nav.Link href='/explore/blogs'>Explore</Nav.Link>
          </Nav>
          <Nav>
            {!isAuthenticated ? (
              <Nav.Link  onClick={() => loginWithRedirect()}>Login</Nav.Link>
            ) : (
              <Nav>
                <Nav.Link id='userName' disabled>
                  {user.email}
                </Nav.Link>
                {/* <Nav.Link href='#' onClick={() => this.handleLogout()}> */}

                <Nav.Link onClick={() => logout({ returnTo: window.location.origin })}>
                  Logout
                </Nav.Link>
              </Nav>
            )}

            {!isAuthenticated ? <Nav.Link href='/register'>Register</Nav.Link> : ''}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
 // }
}

export default NavBar;
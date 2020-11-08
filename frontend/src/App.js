import './App.css';
import React, { Component } from 'react';
import { load_jwts, check_token_fragment, build_login_link } from './auth/auth';
import LoginButton from './LoginButton';
import NavBar from './components/layout/NavBar';
import Game from './components/games/Game';
import GamesList from './components/lists/GamesList';
import UserLists from './components/lists/UserLists';
import Footer from './components/layout/Footer';
let loginLink = '/kk';
class App extends Component {
  componentDidMount() {
    load_jwts();
    check_token_fragment();
    loginLink = build_login_link('/hello');
  }
  render() {

    return (
      <div className='App'>
        <NavBar />

        {/* <h2>{message}</h2> */}
        {/* <button>Login</button> */}
        <h3>Games</h3>
        <GamesList />
        <UserLists />
        <Footer/>
      </div>
    );
  }
}

export default App;

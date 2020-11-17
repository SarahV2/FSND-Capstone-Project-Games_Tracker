import './App.css';
import React, {useState, Component } from 'react';
import NavBar from './components/layout/NavBar';
import GamesList from './components/lists/GamesList';
import UserLists from './components/lists/UserLists';
import Footer from './components/layout/Footer';
import NewGameForm from './components/admin/NewGameForm';
import EditGameForm from './components/admin/EditGameForm';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AdminDashboard from './components/admin/AdminDashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import ProtectedRoute from './components/routing/ProtectedRoute';
import { useAuth0 } from '@auth0/auth0-react';
import FullGameList from './components/admin/FullGameList';
let finalToken = '';
const getToken = async (getAccessTokenSilently) => {
  
  const token = await getAccessTokenSilently({ audience: 'vdtracker' });

  return token;
};

const setToken = (token) => {
  finalToken = token;
};
const App = () => {
  const [token, setTokenValue] = useState(0);
  const [email, setEmail] = useState(0);

  const { isAuthenticated, isLoading,getAccessTokenSilently,user } = useAuth0();
  if(!isLoading&&isAuthenticated){
  getToken(getAccessTokenSilently).then((data) => {
    setToken(data);
    setTokenValue(data)
    setEmail(user.email)
    console.log(token)
  });
  }
  return (
    <div className='App'>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path='/' component={GamesList} />
          <Route exact path='/games' component={GamesList} />
          <ProtectedRoute exact path='/games/new' component={NewGameForm} tokenValue={token} />
          <ProtectedRoute path='/games/edit' component={EditGameForm} tokenValue={token} />
          <PrivateRoute exact path='/games/mygames' component={UserLists} tokenValue={token} email={email} />
          <ProtectedRoute
            exact
            path='/admin/games'
            component={FullGameList}
            tokenValue={token}
          />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
};

export default App;

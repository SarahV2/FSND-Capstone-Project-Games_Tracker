import './App.css';
import React, { Component } from 'react';
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

const App = () => {
  return (
    <div className='App'>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path='/games' component={GamesList} />
          <ProtectedRoute exact path='/games/new' component={NewGameForm} />
          <ProtectedRoute path='/games/edit' component={EditGameForm} />
          <PrivateRoute exact path='/games/mygames' component={UserLists} />
          <ProtectedRoute
            exact
            path='/admin/games'
            component={AdminDashboard}
          />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
};

export default App;

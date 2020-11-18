import './App.css';
import React, { useEffect, useState } from 'react';
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
import TransitiveComponent from './components/routing/TransitiveComponent';
// let finalToken = '';
// const getToken = async (getAccessTokenSilently) => {
//   const token = await getAccessTokenSilently({
//     audience: 'vdtracker',
//     claim: 'openid profile email',
//   });

//   return token;
// };

// const setToken = (token) => {
//   finalToken = token;
// };
const App = () => {
  const {
    isAuthenticated,
    isLoading,
    getAccessTokenSilently,
    user,
  } = useAuth0();
  const [tokeno, setTokenValue] = useState('');
  const [email, setEmail] = useState(0);

  //if (isAuthenticated) {
  useEffect(() => {
    (async () => {
      try {
        const token = await getAccessTokenSilently({
          audience: 'vdtracker',
        });
        setTokenValue(token);
        if (isAuthenticated) {
        setEmail(user.email);
        }
      } catch (e) {
        console.error(e);
      }
    })();
  }, [getAccessTokenSilently]);

  // getToken(getAccessTokenSilently).then((data) => {
  //   //setToken(data);
  //   setTokenValue(data);
  //   // setEmail(user.email);
  //   console.log(tokeno);
  // });
  // }
  return (
    <div className='App'>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path='/' component={GamesList}  />
          <Route exact path='/games' component={GamesList} />
          <ProtectedRoute
            exact
            path='/games/new'
            component={NewGameForm}
           token={tokeno}
          />
          <ProtectedRoute
            path='/games/edit'
            component={EditGameForm}
           token={tokeno}
          />
          <PrivateRoute
            exact
            path='/games/mygames'
            component={UserLists}
           token={tokeno}
           email={email}
          />
          <PrivateRoute
            exact
            path='/mygames'
            component={TransitiveComponent}
           token={tokeno}
           email={email}
          />
          <ProtectedRoute
            exact
            path='/admin/games'
            component={FullGameList}
           token={tokeno}
            
          />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
};

export default App;

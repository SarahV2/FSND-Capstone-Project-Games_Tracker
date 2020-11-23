import './App.css';
import React, { useEffect, useState } from 'react';
import NavBar from './components/layout/NavBar';
import GamesList from './components/lists/GamesList';
import UserLists from './components/lists/UserLists';
import Footer from './components/layout/Footer';
import NewGameForm from './components/admin/NewGameForm';
import EditGameForm from './components/admin/EditGameForm';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/routing/PrivateRoute';
import ProtectedRoute from './components/routing/ProtectedRoute';
import { useAuth0 } from '@auth0/auth0-react';
import FullGameList from './components/admin/FullGameList';
import TransitiveComponent from './components/routing/TransitiveComponent';
import { getUserRecords } from './utils/api';
import Landing from './components/layout/Landing';


const App = () => {

  const {
    isAuthenticated,
    isLoading,
    getAccessTokenSilently,
    user,
  } = useAuth0();

  if (!isLoading && !isAuthenticated) {
    localStorage.removeItem('userRecords')
  }
  const [tokeno, setTokenValue] = useState('');
  const [email, setEmail] = useState(0);
  const [userRecords, setRecords] = useState('')
  const userRole = user && user['http://demozero.net/roles'][0];
  const isGamer = userRole === 'gamer';
  const isAdmin = userRole === 'admin';

  useEffect(() => {
    (async () => {
      try {
        const token = await getAccessTokenSilently({
          audience: 'vdtracker',
        });
        setTokenValue(token);
        if (!isLoading) {
          setEmail(user.email);
          if (isGamer) {
            getUserRecords(user.email, token).then((data) => {
              if (data.userGames) { //get it from the props
                setRecords(data.userGames)
                localStorage.setItem('userRecords', JSON.stringify(data.userGames));
              }
            });
          }
          else if(!isGamer&&!isAdmin){
            window.location.reload();
          }
        }
      } catch (e) {
        console.error(e);
      }
    })();
  }, [getAccessTokenSilently]);
  return (
    <div className='App'>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path='/' component={Landing} isAuthenticated={isAuthenticated} />
          <GamesList exact path='/games'token={tokeno} isAuthenticated={isAuthenticated} isAdmin={isAdmin} isGamer={isGamer} email={email} userRecords={userRecords}/>
        
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
            userRecords={userRecords}
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

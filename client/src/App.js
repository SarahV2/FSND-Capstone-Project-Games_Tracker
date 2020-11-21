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
import {getUserRecords } from './utils/api';
import Landing from './components/layout/Landing';


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
//let userRecords = []

const App = () => {

  const {
    isAuthenticated,
    isLoading,
    getAccessTokenSilently,
    user,
  } = useAuth0();
  const [tokeno, setTokenValue] = useState('');
  const [email, setEmail] = useState(0);
  const [userRecords, setRecords] = useState('')
  const userRole = user && user['http://demozero.net/roles'][0];
  const isGamer = userRole === 'gamer';
  // console.log(isGamer);

  //if (isAuthenticated) {
  useEffect(() => {
    (async () => {
      try {
        const token = await getAccessTokenSilently({
          audience: 'vdtracker',
        });
        //console.log(token)
        setTokenValue(token);
        if (!isLoading) {
          setEmail(user.email);
          let arr=[]
         if (isGamer) {
          // localStorage.setItem('userRecords', JSON.stringify(arr));

            //const recordz = await getUserRecords(user.email, token)
            //console.log('recordzzzz', recordz.userGames)
            //setRecords(recordz.userGames)
            // localStorage.setItem('userRecords', JSON.stringify(recordz.userGames));
            
            getUserRecords(user.email, token).then((data) => {
              if (data.userGames) { //get it from the props
                setRecords(data.userGames)
                localStorage.setItem('userRecords', JSON.stringify(data.userGames));

            //     console.log('hello?')
              }
             });
         }
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
  // let rec=getRecords()
  // console.log(rec)
  return (
    <div className='App'>
      <Router>
        <NavBar />
        {/* <div style={{ marginBottom: '5%', height:'100px'}}>{''}</div> */}

        <Switch>
          <Route exact path='/' component={Landing} isAuthenticated={isAuthenticated} />
          {/* <Route exact path='/ooo' component={temp} /> */}
          <PrivateRoute exact path='/games' component={GamesList} token={tokeno} email={email} userRecords={userRecords}
          />
          {/* <PrivateRoute exact path='/home' component={GamesList} token={tokeno} email={email}
          /> */}
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
        {/* <div style={{ marginTop: '5%'}}>{''}</div> */}

        <Footer />
      </Router>
    </div>
  );
};

// const setRecords = (records) => {
//   userRecords = records;
//   console.log('well', records)
//   console.log('yay invoked!')
// }

// const getRecords=()=>{
//   return userRecords
// }

export default App;

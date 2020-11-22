import React, { Component } from 'react';
import Game from '../games/Game';
import {Container } from 'react-bootstrap';
import { filterGames } from '../../utils/helpers';
import CustomizedList from './CustomizedList';
import { getUserRecords } from '../../utils/api';
import { Redirect } from 'react-router-dom'
import Spinner from '../../utils/loading.gif';

class UserLists extends Component {
  state = {
    gamesList: [],
    totalGames: 0,
    currentlyPlaying: [],
    onHold: [],
    finished: [],
    wantToPlay: [],
    dropped: [],
    redirect: false,
    gotGames: false
  };

  componentDidMount() {
    this.setState({
      redirect: false,
      isLoading: true
    });


    this.getGames()
  }



  getGames() {
  
    let userGames = JSON.parse(localStorage.getItem('userRecords'));

    //Currently Playing 
    const currentlyPlaying = filterGames(userGames, 'currently playing');

    // On Hold
    const onHold = filterGames(userGames, 'on hold');

    // Want to Play
    const wantToPlay = filterGames(userGames, 'want to play');

    // Dropped
    const dropped = filterGames(userGames, 'dropped');

    // Finished
    const finished = filterGames(userGames, 'finished');

    this.setState({ currentlyPlaying, onHold, wantToPlay, dropped, finished })
    this.setState({ isLoading: false })

  }

  render() {
    let games = JSON.parse(localStorage.getItem('userRecords'));

    if (!games) {
      return <Redirect to='/' />
    }

    let { currentlyPlaying, onHold, finished, wantToPlay, dropped, isLoading } = this.state

    let { token, email } = this.props
    return (
      <Container>
        <div style={{ marginBottom: '5%', height: '50px' }}>{''}</div>
        <div>{isLoading? <img src={Spinner}/> :
          <div>
            <h2 className='text-left'>Want to Play ({wantToPlay.length})</h2>
            <CustomizedList refreshParent={() => this.refreshList} token={token} email={email} currentList={wantToPlay} listName='Want to Play' />
            <h3 className='text-left'>Currently Playing ({currentlyPlaying.length})</h3>
            <CustomizedList refreshParent={() => this.refreshList} token={token} email={email} currentList={currentlyPlaying} listName='Currently Playing' />

            <h2 className='text-left'>On Hold ({onHold.length})</h2>
            <CustomizedList refreshParent={() => this.refreshList} token={token} email={email} currentList={onHold} listName='On Hold' />
            <h2 className='text-left'>Finished ({finished.length})</h2>
            <CustomizedList refreshParent={() => this.refreshList} token={token} email={email} currentList={finished} listName='Finished' />
            <h2 className='text-left'>Dropped ({dropped.length})</h2>
            <CustomizedList refreshParent={() => this.refreshList} token={token} email={email} currentList={dropped} listName='Dropped' />

          </div>
        }
        </div>
        <div style={{ marginTop: '5%', height: '50px' }}>{''}</div>

      </Container>
    )
    // }
    // else{
    //  return <img src={Spinner}/>
    // }
  }
}


export default UserLists;
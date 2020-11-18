import React, { Component } from 'react';
import Game from '../games/Game';
import { CardDeck } from 'react-bootstrap';
import { filterGames } from '../../utils/helpers';
import CustomizedList from './CustomizedList';
import { getUserRecords } from '../../utils/api';
import {Redirect} from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'
import Spinner from '../../utils/loading.gif';


let tempList = [
  {
    id:1,
    title: 'MedEvil',
    imgSrc:
      'https://upload.wikimedia.org/wikipedia/en/f/fc/MediEvil_Box_art_cropped.png',
    releaseYear: 2002,
    genres: ['wonderful', 'great'],
    platforms:['PS2','PS5'],
    status: 'currently playing',
  },
  {
    id:45,
    title: 'MedEvil',
    imgSrc:
      'https://upload.wikimedia.org/wikipedia/en/f/fc/MediEvil_Box_art_cropped.png',
    releaseYear: 2002,
    genres: ['wonderful', 'great'],
    platforms:['PS2','PS5'],
    status: 'currently playing',
  },
  {
    id:2,
    title: '2nd Game',
    imgSrc: '',
    releaseYear: 2002,
    genres: ['wonderful', 'great'],
    platforms:['PS2','PS5'],
    status: 'finished',
  },
  {
    id:3,
    title: '3rd Game',
    imgSrc: '',
    releaseYear: 2002,
    genres: ['wonderful', 'great'],
    platforms:['PS2','PS5'],
    status: 'want to play',
  },
];
class UserLists extends Component {
  state = {
    gamesList: [],
    totalGames:0,
    currentlyPlaying: [],
    onHold: [],
    finished: [],
    wantToPlay: [],
    dropped: [],
    redirect:false
  };

  componentDidMount() {
    this.setState({
      gamesList: tempList,
      redirect:false,
      isLoading:true
    });
      console.log('hello from UserList! ')
    console.log(this.props.email)
    this.getGames()

    
    
  }

  refreshList=()=>{
   this.setState({redirect:true})
//     const history = createHistory();
// history.go(0)
 console.log('invoked!')
  }

  getGames() {
    getUserRecords(this.props.email,this.props.token).then((data) => {
      console.log(data.userGames);
      if (data.userGames) {
        this.setState({
          gamesList: data.userGames,
          isLoading:false
          // totalGames: data.total_games,
        });
        console.log('got games', data.userGames);


        let userGames = this.state.gamesList; //this.props
    //if (userGames) {
      // Currently Playing
      const currentlyPlaying = filterGames(userGames, 'currently playing');
      console.log(currentlyPlaying);

      // On Hold
      const onHold = filterGames(userGames, 'on hold');

      console.log(onHold);
    //}

    // Want to Play
    const wantToPlay = filterGames(userGames, 'want to play');
    console.log(wantToPlay);

    // Dropped
    const dropped = filterGames(userGames, 'dropped');
    console.log(dropped);

    // Finished
    const finished = filterGames(userGames, 'finished');
    console.log(finished);

    this.setState({currentlyPlaying,onHold,wantToPlay,dropped,finished})
      }
    });
  }

  render() {
    if(this.state.redirect){
      return <Redirect to='/mygames'/>
    }
    // console.log(this.state)
    // const { gamesList } = this.state;
    // const displayList = gamesList.map((game) => <Game game={game} />);
    let {currentlyPlaying,onHold,finished,wantToPlay,dropped,isLoading}=this.state
    if(isLoading){
      return (<img src={Spinner}/>)
    }
    let {token, email}=this.props
    console.log('want',wantToPlay)
    return (
      <div>
        <h3 className='text-left'>Currently Playing ({currentlyPlaying.length})</h3>
        <CustomizedList refreshParent={()=>this.refreshList} token={token} email={email} currentList={currentlyPlaying} listName='Currently Playing' />
        <h2 className='text-left'>Want to Play ({wantToPlay.length})</h2>
        <CustomizedList refreshParent={()=>this.refreshList} token={token} email={email} currentList={wantToPlay} listName='Want to Play' />
        <h2 className='text-left'>On Hold ({onHold.length})</h2>
        <CustomizedList refreshParent={()=>this.refreshList} token={token} email={email} currentList={onHold} listName='On Hold'/>
        <h2 className='text-left'>Finished ({finished.length})</h2>
        <CustomizedList refreshParent={()=>this.refreshList} token={token} email={email} currentList={finished} listName='Finished' />
        <h2 className='text-left'>Dropped ({dropped.length})</h2>
        <CustomizedList refreshParent={()=>this.refreshList} token={token} email={email} currentList={dropped} listName='Dropped' />

      </div>
      )
  }
}


export default  UserLists;
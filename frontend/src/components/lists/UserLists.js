import React, { Component } from 'react';
import Game from '../games/Game';
import { CardDeck } from 'react-bootstrap';
import { filterGames } from '../../utils/helpers';
import CustomizedList from './CustomizedList';
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
export default class UserLists extends Component {
  state = {
    gamesList: [],
    currentlyPlaying: [],
    onHold: [],
    finished: [],
    wantToPlay: [],
    dropped: [],
  };

  componentDidMount() {
    this.setState({
      gamesList: tempList,
    });

    let userGames = tempList; //this.props
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

  render() {
    // console.log(this.state)
    // const { gamesList } = this.state;
    // const displayList = gamesList.map((game) => <Game game={game} />);
    let {currentlyPlaying,onHold,finished,wantToPlay,dropped}=this.state
    return (
      <div>
        <h2 className='text-left'>Currently Playing ({currentlyPlaying.length})</h2>
        <CustomizedList currentList={currentlyPlaying} listName='Currently Playing' />
        <h2 className='text-left'>On Hold ({onHold.length})</h2>
        <CustomizedList currentList={onHold} listName='On Hold'/>
        <h2 className='text-left'>Finished ({finished.length})</h2>
        <CustomizedList currentList={finished} listName='Finished' />
        <h2 className='text-left'>Want to Play ({wantToPlay.length})</h2>
        <CustomizedList currentList={wantToPlay} listName='Want to Play' />
        <h2 className='text-left'>Dropped ({dropped.length})</h2>
        <CustomizedList currentList={dropped} listName='Dropped' />

      </div>
    );
  }
}

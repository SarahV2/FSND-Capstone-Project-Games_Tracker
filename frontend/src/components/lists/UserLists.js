import React, { Component } from 'react';
import Game from '../games/Game';
import { CardDeck } from 'react-bootstrap';
import { filterGames } from '../../utils/helpers';
import CustomizedList from './CustomizedList';
let tempList = [
  {
    title: 'MedEvil',
    imgSrc:
      'https://upload.wikimedia.org/wikipedia/en/f/fc/MediEvil_Box_art_cropped.png',
    releaseYear: 2002,
    genres: ['wonderful', 'great'],
    status: 'currently playing',
  },
  {
    title: '2nd Game',
    imgSrc: '',
    releaseYear: 2002,
    genres: ['wonderful', 'great'],
    status: 'finished',
  },
  {
    title: '3rd Game',
    imgSrc: '',
    releaseYear: 2002,
    genres: ['wonderful', 'great'],
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
    if (userGames) {
      // Currently Playing
      const currentlyPlaying = filterGames(userGames, 'currently playing');
      console.log(currentlyPlaying);

      // On Hold
      const onHold = filterGames(userGames, 'on hold');

      console.log(onHold);
    }

    // Want to Play
    const wantToPlay = filterGames(userGames, 'want to play');
    console.log(wantToPlay);

    // Dropped
    const dropped = filterGames(userGames, 'dropped');
    console.log(dropped);

    // Finished
    const finished = filterGames(userGames, 'finished');
    console.log(finished);
  }

  render() {
    const { gamesList } = this.state;
    const displayList = gamesList.map((game) => <Game game={game} />);
    return (
      <div>
        <h2 className='text-left'>Currently Playing (0)</h2>
        <CustomizedList />
        <h2 className='text-left'>On Hold (0)</h2>
        <h2 className='text-left'>Finished (0)</h2>
        <h2 className='text-left'>Want to Play (0)</h2>
        <h2 className='text-left'>Dropped (0)</h2>
      </div>
    );
  }
}
